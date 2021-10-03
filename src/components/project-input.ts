import Component from "./base-component";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import * as Validation from '../util/validation';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;


  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this))
  }
  renderContent() { }


  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInput();
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const desc = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: title,
      required: true
    }
    const descValidatable: Validation.Validatable = {
      value: desc,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validation.Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5
    }
    if (!Validation.validate(titleValidatable) || !Validation.validate(descValidatable) || !Validation.validate(peopleValidatable)) {
      alert("Invalid Input, Please try again!");
      return;
    } else {
      return [title, desc, +people]
    }
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

}
