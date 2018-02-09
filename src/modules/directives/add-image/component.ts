import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component(
    {
        selector:    'add-image',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class AddImage {

    @ViewChild('imageFileInput') imageFileInput: any;
    @ViewChild('imageFileOutput') imageFileOutput: ElementRef;

    @Input() FormControl: FormControl;
    @Input() label: string;

    public maxFileSizeMB: number   = 10; // This is a standard attachment size in email
    public invalidMimeType: string = null;
    public invalidFileSize: number = null;

    ngOnInit() {

        !!this.FormControl.value && this.setImagePreview(this.FormControl.value);
    }

    public onImageChange(event: any) {

        this.invalidMimeType = null;
        this.invalidFileSize = null;

        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {

            let reader = new FileReader();

            reader.onload = ((file: Blob) => (event: any) => {
                this.mimeTypeValid(file) && this.fileSizeValid(file) && this.addImage(file);
            })(event.target.files[0]);

            reader.readAsArrayBuffer(event.target.files[0]);
        }
    }

    public onPreviewLoad() {

        URL.revokeObjectURL(this.imageFileOutput.nativeElement.src);
    }

    private addImage(blob: Blob) {

        this.FormControl.patchValue(blob);

        this.setImagePreview(blob);
    }

    private setImagePreview(image: Blob) {

        this.imageFileOutput.nativeElement.src = URL.createObjectURL(image);
    }

    private mimeTypeValid(blob: Blob) {

        const mimeType = blob.type;
        const valid    = !!mimeType.match(/^image\/.*$/);

        if (!valid) {
            this.imageFileInput.nativeElement.value = null;
            this.invalidMimeType                    = mimeType;
        }

        return valid;
    }

    private fileSizeValid(blob: Blob) {

        const fileSizeInMB = Number((blob.size / (1024 * 1024)).toFixed(2));
        const valid        = (fileSizeInMB < this.maxFileSizeMB);

        if (!valid) {
            this.imageFileInput.nativeElement.value = null;
            this.invalidFileSize                    = fileSizeInMB;
        }

        return valid;
    }

    public removeImage() {

        this.imageFileOutput.nativeElement.src = null;
        this.FormControl.reset();
    }
}