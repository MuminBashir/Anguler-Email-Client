import {Component, OnInit} from '@angular/core';
import {EmailService} from "../email.service";

interface emailIndex {
  id: string,
  subject: string,
  from: string
}

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails: emailIndex[] = []

  constructor(private email: EmailService) {
  }

  ngOnInit() {
    this.email.getEmails().subscribe((value) => {
      this.emails = value
    })
  }
}
