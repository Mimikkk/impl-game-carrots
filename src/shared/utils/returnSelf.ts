export const returnSelf =
  <Self extends object>(self: Self) =>
  <Fn extends (...args: any) => void>(fn: Fn) =>
  (...args: Parameters<Fn>): Self => {
    fn.apply(self, args);
    return self;
  };
