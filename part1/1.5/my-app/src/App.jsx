const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

export default App;
