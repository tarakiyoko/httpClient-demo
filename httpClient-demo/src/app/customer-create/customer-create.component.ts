import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  addCustomerForm: FormGroup;
  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { 
    this.router = router;
    this.addCustomerForm = new FormGroup({
      name: new FormControl('initial value'),
      email: new FormControl('initial value')
    })
  }

  ngOnInit() {
    this.addCustomerForm = this.fb.group({
      name: ['test'],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      city: [''],
      country: [''],
      title: ['']
    });
    console.log(this.router);
  }

  addCustomer() {
    if (this.addCustomerForm.valid) {
      this.customerService.addCustomer(this.addCustomerForm.value).subscribe(_ => this.router.navigate(['/list']));
    } else {
      console.log('Fail.');
    }
  }

}
