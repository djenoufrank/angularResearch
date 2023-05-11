import { Component } from "@angular/core";

@Component({
  selector:'app-information',
  templateUrl:'./information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent{
  textArr: string[] = [" text click to change in the button", "New text 1", "New text 2", "New text 3", "New text 4"];
  currentIdx: number = 0;
  text: string = this.textArr[0];

  onClickLeft() {
    this.currentIdx = (this.currentIdx === 0) ? this.textArr.length - 1 : this.currentIdx - 1;
    this.text = this.textArr[this.currentIdx];
  }

  onClickRight() {
    this.currentIdx = (this.currentIdx === this.textArr.length - 1) ? 0 : this.currentIdx + 1;
    this.text = this.textArr[this.currentIdx];
  }
}
