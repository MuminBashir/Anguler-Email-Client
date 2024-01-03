import {Component, ViewChild} from '@angular/core';
import {Email} from "../email";
import {AuthService} from "../../auth/auth.service";
import {EmailFormComponent} from "../email-form/email-form.component";
import {EmailService} from "../email.service";

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent {
  @ViewChild(EmailFormComponent) childRef!: EmailFormComponent

  showModal = false

  email: Email

  constructor(private auth: AuthService, private emailService: EmailService) {
    this.email = {
      from: `${this.auth.username}@angular-email.com`,
      to: "",
      id: "",
      subject: "",
      text: "",
      html: ""
    }
  }

  sendEmail() {
    this.childRef.onSubmit()
  }

  submitEmail(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false
    })
  }
}
