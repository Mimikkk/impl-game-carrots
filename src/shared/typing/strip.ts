export type Strip<
  Value extends string,
  Prefix extends string = "",
  Postfix extends string = "",
> = Value extends `${Prefix}${infer Stripped}${Postfix}` ? Stripped : never;

export type StripPrefix<Value extends string, Prefix extends string> = Strip<Value, Prefix>;
export type StripPostfix<Value extends string, Postfix extends string> = Strip<Value, "", Postfix>;
