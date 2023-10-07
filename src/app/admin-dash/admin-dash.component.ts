import { Component, OnInit } from '@angular/core';
import { userSchema } from './users.model';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// jspdf
import jspdf, { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
})
export class AdminDashComponent implements OnInit {
  allUsers: userSchema[] = [];
  searchTerm: string = '';

  page = 1;
  totalLength: any;

  constructor(
    private adminServiceRepresentative: ApiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.adminServiceRepresentative.getAllUsers().subscribe({
      next: (result: any) => {
        this.allUsers = result;
      },
      error: (error: any) => {
        alert('Error while fetching the data!!');
      },
    });
  }

  delete(id: any) {
    this.adminServiceRepresentative.deleteUser(id).subscribe({
      next: (result: any) => {
        this.getUsersList();
      },
      error: (error: any) => {
        alert('Please try again later!!!');
      },
    });
  }

  sort() {
    this.allUsers.sort((a: any, b: any) => a['name'].localeCompare(b['name']));
  }

  sortById() {
    this.allUsers.sort((a: any, b: any) => a['id'] - b['id']);
  }

  // ----------------------------------------------------------------------------------

  displayInActiveStud() {
    this.adminServiceRepresentative.getAllUsers().subscribe({
      next: (result: any) => {
        this.allUsers = result.filter((item: any) => item['active'] != '1');
      },
    });
  }

  displayActiveStud() {
    this.adminServiceRepresentative.getAllUsers().subscribe({
      next: (result: any) => {
        this.allUsers = result.filter((item: any) => item['active'] == '1');
      },
    });
  }

  displayAll() {
    this.getUsersList();
  }

  register() {
    this.route.navigateByUrl('register');
  }

  printt() {
    console.log(this.searchTerm);
  }

  // ----------------download----------------------
  downloadPdf() {
    let pdf = new jsPDF();
    pdf.text('All Students', 10, 10);
    pdf.setFontSize(16);
    let head = [['ID', 'Name', 'Email', 'Class', 'Status']];
    let body: any = [];

    this.allUsers.forEach((item) => {
      body.push([item.id, item.name, item.email, item.class, item.active]);
    });

    autoTable(pdf, { head, body });
    pdf.save('All Students.pdf');
  }

  // -----------------delete confirm sweet alert------------------------
  confirmDelete(id: any) {
    Swal.fire({
      customClass: {
        confirmButton: 'customBtn',
      },
      title: 'Are you sure to delete❓',
      confirmButtonColor: 'red',
      cancelButtonColor: '',
      text: 'You will not be able to recover this❗',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes delete it',
      cancelButtonText: 'No keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted', 'Your data has been deleted ✅', 'success').then(
          (result: any) => this.delete(id)
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your Data is now safe ✔️', 'error');
      }
    });
  }
}
