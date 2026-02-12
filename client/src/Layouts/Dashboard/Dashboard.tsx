import styles from "./Dashboard.module.css";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import Button from "../../components/atoms/Buttons/Button/Button";
import BoardForm from "../../components/forms/BoardForm/BoardForm";
import useModalStore from "../../stores/useModalStore";
import type { ColumnType } from "../../types/dataTypes";
import { useUserStore } from "../../stores/useUserStore";
import { useEffect } from "react";
import { useGetCurrentBoard } from "../../hooks/queries/board/useGetCurrentBoard";

export default function Dashboard() {
  const open = useModalStore((s) => s.open);
  const currentBoard = useUserStore((s) => s.currentBoard);

  const {
    data: boardData,
    isPending: boardIsPending,
    isError: boardHasError,
  } = useGetCurrentBoard(currentBoard.id);

  useEffect(() => {
    console.log("board query data: ", boardData);
  }, [boardData]);

  // TSX if no board selected
  if (!currentBoard?.id) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyColumnsMessage}>Select a board</p>
      </div>
    );
  }

  // TSX if query pending
  if (boardIsPending) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyColumnsMessage}>
          Loading data for {currentBoard?.title}
        </p>
      </div>
    );
  }

  // TSX if query error
  if (boardHasError) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyColumnsMessage}>Error loading board.</p>
      </div>
    );
  }

  // TSX if there's no columns in the board
  if (!boardData || !boardData.columns || boardData.columns.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noColumnsGroup}>
          <p className={styles.emptyColumnsMessage}>
            This board is empty. Create a new column to get started.
          </p>
          <Button
            padInline={1.2}
            style="primary"
            size="large"
            callback={() => open(<BoardForm type="Edit" />)}
          >
            + Add New Column
          </Button>
        </div>
      </div>
    );
  }

  // TSX if there are columns in the board
  return (
    <div className={styles.container}>
      <div className={styles.populatedContainer}>
        {boardData.columns.map((column: ColumnType) => (
          <TaskColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}

// const sampleData = [
//   {
//     title: "Todo",
//     id: "48024853",
//     tasks: [
//       {
//         id: "02300505",
//         title: "Build UI for onboarding flow",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { id: "440405", title: "open file", complete: false },
//           { id: "748103", title: "eat an apple", complete: false },
//           { id: "g4847q749t", title: "find bananas", complete: true },
//           { id: "840nh44", title: "help a cat", complete: true },
//         ],
//         status: "Todo",
//       },
//       {
//         id: "940458",
//         title:
//           "Save the world by becoming super duper strong until my arms maybe break",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { id: "8383", title: "Help a grandma", complete: true },
//           {
//             id: "0424752",
//             title: "Brush your pearly white teeth",
//             complete: true,
//           },
//           { id: "47beviq3", title: "Start a charity", complete: false },
//           {
//             id: "ekao335",
//             title: "Defeat Globmorg The Destructor",
//             complete: false,
//           },
//           { id: "84afeo301", title: "Tell Gwen you love her", complete: false },
//         ],
//         status: "Todo",
//       },
//       {
//         id: "39504",
//         title: "Do nothing",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { id: "eubfeb1i3", title: "5 minutes of silence", complete: true },
//           { id: "4i04efqoe", title: "Look out the window", complete: true },
//         ],
//         status: "Todo",
//       },
//     ],
//   },
//   {
//     title: "How to become awesome",
//     id: "ei3935013",
//     tasks: [
//       {
//         id: "1111",
//         title: "Get a haircut",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { title: "Make an appointment", complete: true },
//           { title: "Pre haircut wash", complete: true },
//           { title: "Get cut", complete: true },
//           { title: "Check mirrors", complete: false },
//         ],
//         status: "How to become awesome",
//       },
//       {
//         id: "8488594",
//         title: "Ride a motorbike",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { title: "Get a license", complete: true },
//           { title: "Buy motorbike", complete: true },
//           { title: "Buy motorbike gear", complete: false },
//           { title: "Go for a ride", complete: false },
//         ],
//         status: "How to become awesome",
//       },
//       {
//         id: "8642420",
//         title: "Build habits",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { title: "Practice your winks", complete: false },
//           { title: "Comb your hair", complete: false },
//           { title: "Moisturise", complete: false },
//         ],
//         status: "How to become awesome",
//       },
//       {
//         id: "3o4o45u45",
//         title: "An extra task",
//         description:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
//         subtasks: [
//           { title: "Run extra miles", complete: false },
//           { title: "Practice extra violin", complete: false },
//           { title: "Eat extra vegetables", complete: false },
//         ],
//         status: "How to become awesome",
//       },
//     ],
//   },
// ];
