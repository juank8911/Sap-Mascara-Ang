import { Component, ViewChild, ElementRef,Input } from '@angular/core';
import {Afiliado} from '../../models/afiliado';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdgenerate',
  templateUrl: './pdgenerate.component.html',
  styleUrls: ['./pdgenerate.component.css']
})
export class PdgenerateComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() afiliados: Afiliado;
  CurrentDate = new Date();

    constructor() {}

    public openPDF(): void {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('Certificado-Trabajador.pdf');
      });
    }

}
