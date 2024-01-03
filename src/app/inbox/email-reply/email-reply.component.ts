import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Email} from "../email";
import {EmailService} from "../email.service";
import {EmailFormComponent} from "../email-form/email-form.component";

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  showModal = false
  @ViewChild(EmailFormComponent) childRef!: EmailFormComponent
  @Input() email: Email = {
    from: "",
    to: "",
    id: "",
    subject: "",
    text: "",
    html: ""
  }

  constructor(private emailService: EmailService) {
  }

  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n>')

    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n----- ${this.email.from} wrote:\n> ${text}`
    }
  }

  sendEmail() {
    this.childRef.onSubmit()
  }

  emailSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false
    })
  }
}
