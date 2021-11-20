import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeadersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
  }
   toggleClock(event) {
    event.preventDefault();
    // get the clock
var myClock = document.getElementById('menu');


// get the current value of the clock's display property
var displaySetting = myClock.style.display;

// also get the clock button, so we can change what it says
var clockButton = document.getElementById('menu');

// now toggle the clock and the button text, depending on current state
if (displaySetting == 'block') {
// clock is visible. hide it
myClock.style.display = 'none';


}
else {
// clock is hidden. show it
myClock.style.display = 'block';
// change button text

}
}

hideDropdown(event){

    event.preventDefault();
    // get the clock
var myClock = document.getElementById('menu');


// clock is visible. hide it
//myClock.style.display = 'none';

}

}
