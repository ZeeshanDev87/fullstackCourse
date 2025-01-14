const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content part1 = {part1} part2={part2} part3 = {part3}/>
      <Total part1 = {part1} part2={part2} part3 = {part3} />
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ part1,part2,part3 }) => (
  <div>
    <Part name={part1.name} exercises={part1.exercises} />
    <Part name={part2.name} exercises={part2.exercises} />
    <Part name={part3.name} exercises={part3.exercises} />
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({part1,part2,part3}) => {
  return <p>Number of exercises {part1.exercises+part2.exercises+part3.exercises}</p>;
};

export default App;
