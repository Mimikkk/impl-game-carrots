import { Icon } from "@components/buttons/Icon/Icon.js";
import { gold, pay, turnsTillPay } from "@modules/management/management.js";

export const GameInterface = () => {
  return (
    <div class="fixed p-4">
      <div>
        <Icon name="Add" />
        <div>cash icon</div>
        <div>{gold()}</div>
      </div>
      <div>
        Pay <div>cash icon</div>
        {pay()} in {turnsTillPay()} days
      </div>
    </div>
  );
};
