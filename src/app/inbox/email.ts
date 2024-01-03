export interface Email {
  id: string,
  subject: string,
  text: string,
  from: string,
  to: string,
  html: string
}

export interface getEmailsResponse {
  id: string,
  subject: string,
  from: string
}
