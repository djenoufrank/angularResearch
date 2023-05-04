import { Component } from "@angular/core";

@Component({
  selector:'app-information',
  templateUrl:'./information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent{
  textArr1: string[] = [" text ", "New text 1", "New text 2"];
  textArr2: string[] = ["text ", "New text 3", "New text 4"];
  currentIdx: number = 0;
  text: string = this.textArr1[0];

  onClickLeft() {
    this.currentIdx = (this.currentIdx === 0) ? this.textArr1.length - 1 : this.currentIdx - 1;
    this.text = this.textArr1[this.currentIdx];
  }

  onClickRight() {
    this.currentIdx = (this.currentIdx === this.textArr2.length - 1) ? 0 : this.currentIdx + 1;
    this.text = this.textArr2[this.currentIdx];
  }
}
