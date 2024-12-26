
const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )

}

const Content = (props) => {
    return (
        <>
            {
                props.parts.map((item) => {
                    return <Part key={item.id} part={item} />
                })
            }
        </>

    )
}

const Total = (props) => {
    const total = props.count.reduce((valor, current) => valor + current.exercises, 0)

    return (
        <p>Total of {total} exercises </p>
    )

}

const Course = ({ course }) => {

    return (
        <>
            {course.map(item => {
                return (
                    <div key={item.id}>
                        <Header course={item.name} />
                        <Content parts={item.parts} />
                        <Total count={item.parts} />
                    </div>
                )

            })}

        </>
    )
}

export default Course