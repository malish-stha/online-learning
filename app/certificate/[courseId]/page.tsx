"use client";
import React, { useEffect, useState } from "react";
import styles from "./Certificate.module.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

type CertificateProps = {
  courseId: string;
};

type CertificateData = {
  userName: string;
  courseTitle: string;
  courseId: string;
};

const Certificate: React.FC<CertificateProps> = ({ courseId }) => {
  const { user } = useUser();
  const [certificateData, setCertificateData] = useState<CertificateData>({
    userName: "",
    courseTitle: "",
    courseId: courseId,
  });

  useEffect(() => {
    if (user) {
      setCertificateData((prevData) => ({
        ...prevData,
        userName: `${user.firstName} ${user.lastName}`,
      }));
    }
  }, [user]);

  const downloadPDF = () => {
    const input = document.getElementById("certificate");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "in", "letter"); // Landscape orientation, inches, letter size (8.5 x 11 inches)
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = 11; // Width of the page in inches
        // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const pdfHeight = 8.5;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificate.pdf");
      });
    }
  };

  return (
    <div className={styles.container}>
      <div id="certificate" className={styles.certificateContainer}>
        <div className={styles.header}>
          <h1>CERTIFICATE</h1>
          <h2>OF ACHIEVEMENT</h2>
        </div>
        <p className={styles.awardText}>
          THIS CERTIFICATE IS PROUDLY AWARDED TO
        </p>
        <h1 className={styles.recipientName}>{certificateData.userName}</h1>
        <p className={styles.description}>
          for successfully completing the course.
        </p>

        <div className={styles.stamp}>
          <img src="/certi.png" alt="Stamp" />
        </div>
      </div>

      <Button onClick={downloadPDF} className={styles.downloadButton}>
        Download as PDF
      </Button>
    </div>
  );
};

export default Certificate;
