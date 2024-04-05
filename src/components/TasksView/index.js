import {ListItem, TextPara, Tags} from './styledComponents'

const TasksView = props => {
  const {tasksDetails} = props
  const {text, displayText} = tasksDetails

  return (
    <ListItem>
      <TextPara>{text}</TextPara>
      <Tags>{displayText}</Tags>
    </ListItem>
  )
}

export default TasksView
