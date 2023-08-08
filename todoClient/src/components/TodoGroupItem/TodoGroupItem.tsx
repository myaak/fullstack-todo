import { TodoGroupItemCircle, TodoGroupItemWrapper } from "./TodoGroupItem.styled.ts";

interface TodoGroupItemProps {
  title: string;
  onDelete: () => void;
}

const TodoGroupItem: React.FC<TodoGroupItemProps> = ({ title, onDelete }) => {
  return (
    <>
      <TodoGroupItemWrapper>
        <TodoGroupItemCircle onClick={onDelete} />
        {title}
      </TodoGroupItemWrapper>
    </>
  );
};

export default TodoGroupItem;
