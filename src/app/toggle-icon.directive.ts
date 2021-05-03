import { Attribute, Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appToggleIcon]"
})
export class ToggleIconDirective implements OnInit {

  private _element: HTMLElement;
  isOpen: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Attribute("img-src-1") private imgSrc1: string, @Attribute("img-src-2") private imgSrc2: string) {
    this._element = this.elementRef.nativeElement as HTMLElement;
  }

  get element(): HTMLElement { return this._element; }

  ngOnInit(): void {
    const img = this.renderer.createElement("img");
    img.setAttribute("src", this.imgSrc1);
    this.element.append(img);
  }

  @HostListener("click") onClick(): void {
    this.isOpen = !this.isOpen;

    const img = Array.prototype.find.call(this.element.childNodes, (child) => (child.classList && child.tagName === "IMG"));

    if (this.isOpen) {
      img.setAttribute("src", this.imgSrc2);
    } else {
      img.setAttribute("src", this.imgSrc1);
    }
  }
}
