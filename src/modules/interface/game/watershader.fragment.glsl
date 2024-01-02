uniform struct {
    vec2 resolution;
    float time;
} globals;


uniform struct {
    int iterations_height;
    int iterations_geometry;
    int iterations_fragment;
    float height;
    float choppy;
    float speed;
    float frequency;
    vec3 level_color;
    vec3 water_color;
} configuration;

float hash(vec2 point) { return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 point) {
    vec2 integer = floor(point);
    vec2 fraction = fract(point);
    vec2 uniform_ = fraction * fraction * (3.0 - 2.0 * fraction);

    return -1.0 + 2.0 * mix(
    mix(
    hash(integer + vec2(0.0, 0.0)
    ),
    hash(integer + vec2(1.0, 0.0)), uniform_.x),
    mix(hash(integer + vec2(0.0, 1.0)),
    hash(integer + vec2(1.0, 1.0)), uniform_.x),
    uniform_.y
    );
}

float diffuse(vec3 n, vec3 l, float p) {
    return pow(dot(n, l) * 0.4 + 0.6, p);
}

float specular(vec3 n, vec3 l, vec3 e, float s) {
    float nrm = (s + 8.0) / (3.1415 * 8.0);
    return pow(max(dot(reflect(e, n), l), 0.0), s) * nrm;
}

vec3 calculateSkyColor(vec3 eye) {
    return vec3(
    pow(1.0 - eye.y, 2.0),
    1.0 - eye.y,
    0.6+(1.0 - eye.y) * 0.4
    );
}

float sea_octave(vec2 uv, float choppy) {
    uv += noise(uv);
    vec2 wv = 1.0 - abs(sin(uv));
    wv = mix(wv, abs(cos(uv)), wv);

    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
}

float map(vec3 point) {
    float freq = configuration.frequency;
    float amp = configuration.height;
    float choppy = configuration.choppy;
    vec2 uv = point.xz;
    uv.x *= 0.75;

    float d, h = 0.0;
    for (int i = 0; i < configuration.iterations_geometry; i++) {
        d = sea_octave((uv + (globals.time * configuration.speed)) * freq, choppy);
        d += sea_octave((uv - (globals.time * configuration.speed)) * freq, choppy);
        h += d * amp;
        uv *= mat2(1.6, 1.2, -1.2, 1.6);
        freq *= 1.9;
        amp *= 0.22;
        choppy = mix(choppy, 1.0, 0.2);
    }
    return point.y - h;
}

float map_detailed(vec3 point) {
    float freq = configuration.frequency;
    float amp = configuration.height;
    float choppy = configuration.choppy;
    vec2 uv = point.xz;
    uv.x *= 0.75;

    float d, h = 0.0;
    for (int i = 0; i < configuration.iterations_fragment; ++i) {
        d = sea_octave((uv+(globals.time * configuration.speed)) * freq, choppy);
        d += sea_octave((uv-(globals.time * configuration.speed)) * freq, choppy);
        h += d * amp;
        uv *= mat2(1.6, 1.2, -1.2, 1.6);
        freq *= 1.9;
        amp *= 0.22;
        choppy = mix(choppy, 1.0, 0.2);
    }
    return point.y - h;
}

vec3 calculateSeaColor(
vec3 point,
vec3 normal,
vec3 left,
vec3 eye,
vec3 disatnce
) {
    float fresnel = 1.0 - max(dot(normal, -eye), 0.0);
    fresnel = pow(fresnel, 3.0) * 0.65;

    vec3 reflected = calculateSkyColor(reflect(eye, normal));
    vec3 refracted = configuration.level_color + diffuse(normal, left, 80.0) * configuration.water_color * 0.12;

    float atten = max(1.0 - dot(disatnce, disatnce) * 0.001, 0.0);

    vec3 color = mix(refracted, reflected, fresnel)
    + configuration.water_color * (point.y - configuration.height) * 0.18 * atten
    + vec3(specular(normal, left, eye, 60.0));

    return color;
}

vec3 getNormal(vec3 p, float eps) {
    vec3 n;
    n.y = map_detailed(p);
    n.x = map_detailed(vec3(p.x+eps, p.y, p.z)) - n.y;
    n.z = map_detailed(vec3(p.x, p.y, p.z+eps)) - n.y;
    n.y = eps;
    return normalize(n);
}

float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
    float tm = 0.0;
    float tx = 1000.0;
    float hx = map(ori + dir * tx);

    if (hx > 0.0) {
        return tx;
    }

    float hm = map(ori + dir * tm);
    float tmid = 0.0;
    for (int i = 0; i < configuration.iterations_height; i++) {
        tmid = mix(tm, tx, hm/(hm-hx));
        p = ori + dir * tmid;
        float hmid = map(p);
        if (hmid < 0.0) {
            tx = tmid;
            hx = hmid;
        } else {
            tm = tmid;
            hm = hmid;
        }
    }
    return tmid;
}

void main() {
    vec2 uv = gl_FragCoord.xy / globals.resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= globals.resolution.x / globals.resolution.y;
    float time = globals.time * 0.3;

    // ray
    vec3 angular = vec3(
    sin(time*3.0)*0.1, sin(time)*0.2+0.3, time
    );
    vec3 orientation = vec3(0.0, 3.5, time*5.0);
    vec3 direction = normalize(
    vec3(uv.xy, -2.0)
    );
    direction.z += length(uv) * 0.15;
    direction = normalize(direction);

    // tracing
    vec3 position;
    heightMapTracing(orientation, direction, position);

    vec3 distance = position - orientation;
    vec3 normal = getNormal(
    position,
    dot(distance, distance) * (0.1 / globals.resolution.x)
    );
    vec3 light = normalize(vec3(0.0, 1.0, 0.8));

    // color
    vec3 color = mix(
    calculateSkyColor(direction),
    calculateSeaColor(position, normal, light, direction, distance),
    pow(smoothstep(0.0, -0.05, direction.y), 0.3)
    );

    // post
    gl_FragColor = vec4(pow(color, vec3(0.75)), 1.0);
}
