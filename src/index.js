import React, {Component} from "react";
import ReactDOM from "react-dom";
import "scss/base.scss";

const SelectOption = (props) => {
    return (        
        props.options.map((opt,index)=> <option key={index} value={opt}>{opt}</option>)
    )
}

const FormType = (props)=>{
    if(props.type == 'dropdown'){
        retun (
            <div>
                <select>
                    <SelectOption {...props.options}/>
                </select>
            </div>
        )
    }
    return (
        <div>
            <input placeholder={props.label} type={props.type} />
        </div>
    )
}

const QuestionFormField = (props) =>{
    return (
        <div>
            <lable>{props.label}:</lable>
            <FormType {...props}/>
        </div>
    )
}

const Subquestions = (props) =>{
    const {fields,title} = props
    return (
        <div>
            <legend>{title}</legend>
            {fields.map((field)=><QuestionFormField {...field} />)}
        </div>
    )
}

const QuestionsList = (props) =>{
    const {questions} = props
    return (
        <div>
            {questions.map((question)=> <Subquestions {...question}/>)}
        </div>
    )
}

class App extends Component{
    state = {
        "questions": [
          {
            "title": "Tell us about yourself",
            "fields": [
              { "name": "first_name", "label": "First Name", "type": "text" },
              { "name": "last_name", "label": "Last Name", "type": "text" },
              { "name": "email", "label": "Email", "type": "text" },
              { "name": "phone_number", "label": "Phone Number", "type": "text" }
            ]
          },
          {
            "title": "Where do you live?",
            "fields": [
              { "name": "street_address", "label": "Street Address", "type": "text" },
              { "name": "post_code", "label": "Post Code", "type": "text" },
              { "name": "country", "label": "Country", "type": "dropdown", "options": ["Canada", "USA"] },
            ]
          }
        ]
    }
    render(){
        return (
            <div>
                <h1>No Issue</h1>
                <form onSubmit={()=>this.handleSubmit}>
                    <QuestionsList questions={this.state.questions}/>
                </form>
            </div>

        )
    }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);