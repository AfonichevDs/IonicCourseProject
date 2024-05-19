import { CommonModule, DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'date-time-button',
    templateUrl: './date-time-button.component.html',
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        CommonModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimeButtonComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimeButtonComponent implements OnInit, ControlValueAccessor {

    public dateControl = new FormControl<string>('');

    @Input({ required: true }) id: string;
    @Input() placeholder: string;

    onChange: (value: string) => void;
    onTouched: () => void;

    showCalendar$ = new BehaviorSubject<boolean>(false);

    public writeValue(value: string): void {
        this.dateControl.setValue(value, { emitEvent: false });
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.dateControl.disable();
        } else {
            this.dateControl.enable();
        }
    }

    private writeChanges(value: string): void {
        if (this.onChange) {
            this.onChange(value);
        }

        if (this.onTouched) {
            this.onTouched();
        }
    }

    ngOnInit(): void {
    }

    dateFromChanged(event: CustomEvent) {
        this.dateControl.setValue(event.detail.value);
        this.writeChanges(event.detail.value);
    }

    openCalendar() {
        this.showCalendar$.next(true);
    }
    cancelCalendar() {
        this.showCalendar$.next(false);
    }
}