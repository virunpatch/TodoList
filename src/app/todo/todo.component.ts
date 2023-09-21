import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../class/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoValue: String = '';

  todoList: Todo[] = [
    {
      conent: "Todo 1",
      value: false
    },
    {
      conent: "Todo 2",
      value: false
    },
    {
      conent: "Todo 3",
      value: false
    }
  ];
  finishedList: Todo[] = [

  ]
  constructor(private modalService: NgbModal){
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
      this.todoList = JSON.parse(savedTodoList);
    }

    const savedFinishedList = localStorage.getItem('finishedList');
    if (savedFinishedList) {
      this.finishedList = JSON.parse(savedFinishedList);
    }
  }

  addTodo(){
    this.todoList.push({conent:this.todoValue,value:false});
    this.todoValue='';
  }

  changeTodo(i:number){
    const item = this.todoList.splice(i,1);
    console.log(item);
    this.finishedList.push(item[0]);
  }

  changeFinished(i:number){
    const item = this.finishedList.splice(i,1);
    console.log(item);
    this.todoList.push(item[0]);
  }

  openModal(content: TemplateRef<Element>, i:number, type: String){
    this.modalService.open(content, {ariaDescribedBy: 'modl-basic-tile'}).result.then(
      (result)=>{
        if(type == 'todoList'){
          this.todoList.splice(i,1);
        }else{
          this.finishedList.splice(i,1);
        }
        this.saveToLocalStorage();
      },
      (reason)=>{

      }
    )
  }
  saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    localStorage.setItem('finishedList', JSON.stringify(this.finishedList));
  }

}
