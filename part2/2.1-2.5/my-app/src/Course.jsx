const Course = ({ course }) => {
  const Header = ({ course }) => <h1>{course.name}</h1>;

  const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );

  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  );

  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p>Total Number of exercises {totalExercises}</p>;
  };

  const ViewCourse = ({ course }) => (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );

  return (
    <div>
      {course.map(course => (
        <ViewCourse key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;