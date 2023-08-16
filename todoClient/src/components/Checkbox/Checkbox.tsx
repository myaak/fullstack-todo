import { Checkbox, CheckboxSymbol, CheckboxWrapper, IconCheckbox, VisuallyHidden } from "./Checkbox.styled.ts";
import { useAppSelector } from "../../store/storeHooks.ts";

interface StyledCheckboxProps {
  isChecked: boolean;
  disabled?: boolean;
  onCheckboxChange?: () => void;
}
const StyledCheckbox: React.FC<StyledCheckboxProps> = ({ isChecked, onCheckboxChange }) => {
  const isLoadingTodo = useAppSelector((state) => state.todo.isLoadingTodo);

  return (
    <CheckboxWrapper>
      <Checkbox onChange={onCheckboxChange}>
        <VisuallyHidden disabled={isLoadingTodo} />
        <CheckboxSymbol checked={isChecked}>
          <IconCheckbox
            aria-hidden="true"
            className="icon-checkbox"
            width="28px"
            height="28px"
            viewBox="0 0 28 28"
            checked={isChecked}
          >
            <path d="M4 14l8 7L24 7"></path>
          </IconCheckbox>
        </CheckboxSymbol>
      </Checkbox>
    </CheckboxWrapper>
  );
};

export default StyledCheckbox;
