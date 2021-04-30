import { AfterViewInit, ContentChild, Directive, ElementRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { fromEvent, Observable, Subscriber, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DraggingHandleDirective } from "./dragging-handle.directive";


@Directive({
  selector: "[appDragging]"
})
export class DraggingDirective implements AfterViewInit, OnDestroy {
  private element: HTMLElement;

  private subscriptions: Subscription[] = [];

  @ContentChild(DraggingHandleDirective) handle: DraggingHandleDirective | undefined;
  handleElement: HTMLElement;

  observerCoordinates: Observable<{ [key: string]: number }> | undefined;

  // private readonly DEFAULT_DRAGGING_BOUNDARY_QUERY = "tbody";
  // @Input() boundaryQuery = this.DEFAULT_DRAGGING_BOUNDARY_QUERY;
  // draggingBoundaryElement: HTMLElement | HTMLBodyElement | null;
  // siblingsElements: Array<HTMLElement | HTMLBodyElement>;
  // boundarySiblings: Array<{ [key: string]: string }>;

  constructor(public draggingElementRef: ElementRef, @Inject(DOCUMENT) private document: any) {
    this.element = this.draggingElementRef.nativeElement as HTMLElement;
    this.handleElement = this.handle?.elementRef?.nativeElement || this.element;
    // this.draggingBoundaryElement = (this.document as Document).querySelector(
    //   this.boundaryQuery
    // );
    // this.siblingsElements = [...this.document.querySelectorAll("tr")];
  }

  ngAfterViewInit(): void {
    // console.log(this.siblingsElements);
    // console.log([].map.call(this.draggingBoundaryElement?.childNodes, (node)=> node as HTMLElement | HTMLBodyElement) instanceof Array<HTMLElement | HTMLBodyElement>);
    // if (!this.draggingBoundaryElement) {
    // throw new Error(
    // "Couldn't find any element with query: " + this.boundaryQuery
    // );
    // } else {
    // this.element = this.elementRef.nativeElement as HTMLElement;
    // this.handleElement = this.handle?.elementRef?.nativeElement || this.element;
    this.initDrag();
    // }
  }

  initDrag(): void {
    console.log("dragging");

    // console.log(this.siblingsElements);

    // if (!this.draggingBoundaryElement) {
    //   return;
    // }

    // const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragStart$ = fromEvent<MouseEvent>(this.handleElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription | undefined;

    // console.log("offset height", this.draggingBoundaryElement.offsetHeight);
    // console.log("offset top", this.draggingBoundaryElement.offsetTop);
    // console.log(this.draggingBoundaryElement.getBoundingClientRect().top);

    // const minBoundX = this.draggingBoundaryElement.offsetLeft;
    // const minBoundY = this.draggingBoundaryElement.offsetTop;
    // const minBoundY = this.draggingBoundaryElement.getBoundingClientRect().top;
    // const maxBoundX =
    //   minBoundX +
    //   this.draggingBoundaryElement.offsetWidth -
    //   this.element.offsetWidth;
    // const maxBoundY =
    //   minBoundY +
    //   this.draggingBoundaryElement.offsetHeight -
    //   this.element.offsetHeight;
    // const maxBoundY =
    // minBoundY +
    // this.draggingBoundaryElement.getBoundingClientRect().height -
    // this.element.getBoundingClientRect().height;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.element.classList.add('free-dragging');

      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        this.observerCoordinates = new Observable((subscriber: Subscriber<{[key: string]: number}>) => {
          console.log("Subscriber Subscribed");
          subscriber.next({currentX, currentY});
          return () => { console.log("Unsubscribed"); };
        });

        console.log(this.observerCoordinates);
      });
      // const x = event.clientX - initialX;
      // const y = event.clientY - initialY;

      // currentX = Math.max(minBoundX, Math.min(x, maxBoundX));
      // currentY = Math.max(minBoundY, Math.min(y, maxBoundY));

      this.element.style.transform =
        "translate3d(" + currentX + "px, " + currentY + "px, 0)";
    });

    const dragEndSub = dragEnd$.subscribe(() => {
      initialY = currentY;
      this.element.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    if (dragSub) {
      this.subscriptions.push.apply(this.subscriptions, [
        dragStartSub,
        dragSub,
        dragEndSub,
      ]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
