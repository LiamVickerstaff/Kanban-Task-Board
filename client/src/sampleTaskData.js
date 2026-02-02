const sampleTaskData = [
  {
    title: "Todo",
    id: "48024853",
    tasks: [
      {
        id: "02300505",
        title: "Build UI for onboarding flow",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { id: "440405", title: "open file", complete: false },
          { id: "748103", title: "eat an apple", complete: false },
          { id: "g4847q749t", title: "find bananas", complete: true },
          { id: "840nh44", title: "help a cat", complete: true },
        ],
        status: "Todo",
      },
      {
        id: "940458",
        title:
          "Save the world by becoming super duper strong until my arms maybe break",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { id: "8383", title: "Help a grandma", complete: true },
          {
            id: "0424752",
            title: "Brush your pearly white teeth",
            complete: true,
          },
          { id: "47beviq3", title: "Start a charity", complete: false },
          {
            id: "ekao335",
            title: "Defeat Globmorg The Destructor",
            complete: false,
          },
          { id: "84afeo301", title: "Tell Gwen you love her", complete: false },
        ],
        status: "Todo",
      },
      {
        id: "39504",
        title: "Do nothing",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { id: "eubfeb1i3", title: "5 minutes of silence", complete: true },
          { id: "4i04efqoe", title: "Look out the window", complete: true },
        ],
        status: "Todo",
      },
    ],
  },
  {
    title: "How to become awesome",
    id: "ei3935013",
    tasks: [
      {
        id: "1111",
        title: "Get a haircut",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { title: "Make an appointment", complete: true },
          { title: "Pre haircut wash", complete: true },
          { title: "Get cut", complete: true },
          { title: "Check mirrors", complete: false },
        ],
        status: "How to become awesome",
      },
      {
        id: "8488594",
        title: "Ride a motorbike",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { title: "Get a license", complete: true },
          { title: "Buy motorbike", complete: true },
          { title: "Buy motorbike gear", complete: false },
          { title: "Go for a ride", complete: false },
        ],
        status: "How to become awesome",
      },
      {
        id: "8642420",
        title: "Build habits",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { title: "Practice your winks", complete: false },
          { title: "Comb your hair", complete: false },
          { title: "Moisturise", complete: false },
        ],
        status: "How to become awesome",
      },
      {
        id: "3o4o45u45",
        title: "An extra task",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum obcaecati autem numquam saepe atque, esse corporis sequi quia sed sapiente aliquam optio, repellat illum perferendis unde reiciendis iusto voluptates qui ullam ut illo totam? Quasi asperiores pariatur autem accusantium hic!",
        subtasks: [
          { title: "Run extra miles", complete: false },
          { title: "Practice extra violin", complete: false },
          { title: "Eat extra vegetables", complete: false },
        ],
        status: "How to become awesome",
      },
    ],
  },
];

export const placeholderText = {
  title: "e.g. Take coffee break",
  description:
    "e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.",
  subtasks: ["e.g. Make coffee", "e.g. Drink coffee & smile"],
  statusOptions: ["Todo", "Doing", "Done"],
};

export const boardData = {
  title: "Platform Launch",
  columns: [{ title: "Todo" }, { title: "Doing" }, { title: "Done" }],
};

export default sampleTaskData;
