import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numconverted: number;
  finalAnswer: string = '';
  reminderInt: number = 0;
  reminderRoman: string;
  numone: string;
  numtwo: string;
  inputNumArray: Array<any>;
  calcoperator: string = '+';
  showResult: boolean = false;
  errorMessage: string;
  numArrayConvt: Array<any> = [];
  operatorchange() {
    this.showResult = false;
  }
  caculate() {
    this.inputNumArray = [];
    this.numArrayConvt = [];
    this.inputNumArray.push(this.numone, this.numtwo);
    for (let element of this.inputNumArray) {
      this.numconverted = this.convertToInt(element)
      if (this.numconverted < 0) { return }
      this.numArrayConvt.push(this.numconverted);
    }
    if (this.calcoperator == '-' && this.numArrayConvt[0] < this.numArrayConvt[1]) {
      this.errorMessage = 'Cannoct subtract Higher number from a Lower Number';
      this.showResult = true;
      this.finalAnswer = '';
      this.reminderInt = 0;
    }
    if (this.calcoperator == '/' && this.numArrayConvt[0] < this.numArrayConvt[1]) {
      this.errorMessage = 'Cannoct divide Higher number into Lower Number';
      this.showResult = true;
      this.finalAnswer = '';
      this.reminderInt = 0;
    }
    else {
      let logicAnswer = eval([this.numArrayConvt[0], this.calcoperator, this.numArrayConvt[1]].join(""));
      this.reminderInt = (this.calcoperator == '/') ? this.numArrayConvt[0] % this.numArrayConvt[1] : 0;
      this.reminderRoman = this.convertToroman(this.reminderInt);
      this.finalAnswer = (logicAnswer == 0) ? 'ZERO' : this.convertToroman(logicAnswer);
      this.showResult = true;
    }
  }
  convertToroman(num) {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    for (let i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }
  convertToInt(str1) {
    if (str1 !== null && this.validRoman(str1)) {
      let num = this.chartoint(str1.charAt(0));
      let pre, curr;
      for (let i = 1; i < str1.length; i++) {
        curr = this.chartoint(str1.charAt(i));
        pre = this.chartoint(str1.charAt(i - 1));
        if (curr <= pre) {
          num += curr;
        } else {
          num = num - pre * 2 + curr;
        }
      }
      return num;
    }
    else {
      alert('NOT a ROMAN');
      return -1;
    }
  }
  chartoint(c) {
    switch (c) {
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      default: return -1;
    }
  }
  validRoman(romanNum) {
    let num = romanNum.toUpperCase();
    let validRomanNums = ["M", "D", "C", "L", "X", "V", "I", "(", ")"]
    for (let i = 0; i < num.length; i++) {
      return validRomanNums.includes(num.charAt(i));
    }
  }
}
