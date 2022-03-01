import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  constructor(private Renderer: Renderer2, private elRef: ElementRef) { }
  
  // @HostListener('click') itemClick() {
  //   this.Renderer.addClass(this.elRef.nativeElement, 'show')
  // }

  ngOnInit(): void {

    this.Renderer.listen(this.elRef.nativeElement, 'click', () => {
        if((this.elRef.nativeElement as HTMLElement).classList.contains('show')) {
          this.Renderer.removeClass(this.elRef.nativeElement, 'show')
          this.Renderer.removeClass( this.Renderer.nextSibling(this.elRef.nativeElement), 'show')
        }else {
          this.Renderer.addClass(this.elRef.nativeElement, 'show')
          this.Renderer.addClass( this.Renderer.nextSibling(this.elRef.nativeElement), 'show')
        }
      })
  }
}