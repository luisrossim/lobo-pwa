import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  private _collapsed: boolean = false;
  protected _screenWidth: number = window.innerWidth;
  bodyClass: string = '';

  @Input() set collapsed(value: boolean) {
    this._collapsed = value;
    this.updateBodyClass();
  }

  @Input() set screenWidth(value: number) {
    this._screenWidth = value;
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this._collapsed && this._screenWidth >= 768) {
      this.bodyClass = 'body-trimmed';
    } else {
      this.bodyClass = '';
    }
  }
}
