import { Component, Input } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from '../../utils/styles/animations';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  animations: [slideInAnimation]
})
export class BodyComponent {
  private _collapsed: boolean = false;
  protected _screenWidth: number = window.innerWidth;
  bodyClass: string = '';

  constructor(private contexts: ChildrenOutletContexts) {}

  @Input() set collapsed(value: boolean) {
    this._collapsed = value;
    this.updateBodyClass();
  }

  @Input() set screenWidth(value: number) {
    this._screenWidth = value;
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    const classes = [];
  
    if (this._collapsed && this._screenWidth > 1024) {
      classes.push('body-trimmed');
    }
  
    if (this._collapsed && this._screenWidth <= 1024) {
      classes.push('body-overlay');
    }
  
    this.bodyClass = classes.join(' ');
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
