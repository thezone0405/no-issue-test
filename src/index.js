import React, {Component} from "react";
import ReactDOM from "react-dom";
import "scss/base.scss";

const SelectOption = (props) => {
    return (        
         <option value={props.option}>{props.option}</option>
    )
}

class FormType extends Component{
    changeTrigger = (e)=>{
        this.props.handleInputChange(e)
    }
    render(){
        let stateProp = this.props.name.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
        if(this.props.type == 'dropdown'){
            return (
                <div>
                    <select name={stateProp} value={this.props[stateProp]} onChange={this.changeTrigger}>
                        {this.props.options.map((opt,index)=><SelectOption key={index} option={opt}/>)}
                    </select>
                </div>
            )
        }
        return (
            <div>
                <input name={stateProp} onChange={this.changeTrigger} placeholder={this.props.label} type={this.props.type} />
            </div>
        )
    }
}

const QuestionFormField = (props) =>{
    return (
        <div>
            <label>{props.label}:</label>
            <FormType {...props.inputField}  handleInputChange={props.handleInputChange} {...props}/>
        </div>
    )
}

const Subquestions = (props) =>{
    const {fields,title} = props
    return (
        <div>
            <legend>{title}</legend>
            {fields.map((field,index)=><QuestionFormField inputField={props.inputField} handleInputChange={props.handleInputChange} key={index} {...field} />)}
        </div>
    )
}

const QuestionsList = (props) =>{
    const {questions} = props
    return (
        <div>
            {questions.map((question,index)=> <Subquestions handleInputChange={props.handleInputChange} inputField={props.fields} key={index} {...question}/>)}
        </div>
    )
}

class App extends Component{
    state = {}
    handleSubmit = (e) => {
        e.preventDefault() 
        for(let key of Object.keys(this.state.fields)){
            console.log(key,':',this.state.fields[key])
        }
    }
    handleInputChange = (e) =>{
        let property = e.target.getAttribute("name")
        let value = e.target.value
        this.setState(prevState=>({fields:Object.assign(prevState.fields,{[property]:value})}))
    }
    componentWillMount() {
        const fields = {}
        this.props.config.questions.map((question)=>{
            question.fields.map((field)=>{
                fields[field.name.replace(/_([a-z])/g, (g) => g[1].toUpperCase())] = ''
            })
        })
        this.setState({
            fields
        })
    }
    render(){
        return (
            <div>
                <h1>No Issue</h1>
                <form onSubmit={this.handleSubmit}>
                    <QuestionsList handleInputChange={this.handleInputChange} {...this.state} questions={this.props.config.questions}/>
                    <button type="submit">Submit</button>
                </form>
            </div>

        )
    }
}

const formConfig = {
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

ReactDOM.render(
  <App config={formConfig} />,
  document.getElementById("root")
);