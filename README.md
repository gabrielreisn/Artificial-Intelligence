# Artificial-Intelligence

Repository used for UTFPR classes (sistemas inteligentes) containing A-\* (A-start) and BFS (Breadth-first search) algorithms

# Representing symbols

The algorithm uses a file for representing the maze, the file should content the following rules:

- First Line: a single integer, representing the number of rows(n_rows) of the environment;
- Second Line: a single integer, representing the number of columns(n_cols) of the environment;
- A sequence of 'n_rows' lines, each with 'n_cols' symbols from:
  - Character '.' representing free positions in the grid;
  - Character '\*' representing positions in the grid with obstacles;
  - Character 'x' representing the 'goal' position of the 'robot';
    - One of the following characters, representing the robot's initial position and orientation:
      - Character '>' if the robot is facing EAST [ LESTE ];
      - Character '^' if the robot is facing NORTH [ NORTE ];
      - Character '<' if the robot is facing WEST [ OESTE ];
      - Character 'v' if the robot is facing SOUTH [ SUL ];

# Running the project

#### 1- Make sure you have at least Node.js version 8.11+ (test running: `node -v`)

#### 2- Running A-Star algorithm: `node src/astar.js FILE_WITH_MAP.txt`

#### 3- Running BFS algorithm: `node src/bfs.js FILE_WITH_MAP.txt`

## A-star result (manual plotting)

![image](https://user-images.githubusercontent.com/13686332/64506734-fd75a980-d2ae-11e9-8c8b-c66e6fc62c38.png)
