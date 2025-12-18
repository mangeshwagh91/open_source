export interface Certificate {
  id: string;
  title: string;
  recipient: string;
  issueDate: string;
  type: "participation" | "mentor" | "topper" | "completion";
  downloadUrl: string;
}

export const certificatesData: Certificate[] = [
  {
    id: "cert-001",
    title: "Certificate of Participation",
    recipient: "John Doe",
    issueDate: "August 2024",
    type: "participation",
    downloadUrl: "#",
  },
  {
    id: "cert-002",
    title: "Certificate of Excellence",
    recipient: "Jane Smith",
    issueDate: "August 2024",
    type: "topper",
    downloadUrl: "#",
  },
  {
    id: "cert-003",
    title: "Mentor Certificate",
    recipient: "Dr. Alex Johnson",
    issueDate: "August 2024",
    type: "mentor",
    downloadUrl: "#",
  },
  {
    id: "cert-004",
    title: "Completion Certificate",
    recipient: "Emily Davis",
    issueDate: "August 2024",
    type: "completion",
    downloadUrl: "#",
  },
];