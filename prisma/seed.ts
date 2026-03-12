import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const HASH = bcrypt.hashSync("password123", 12);

async function main() {
  await prisma.mailTemplate.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.project.deleteMany();
  await prisma.score.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.management.deleteMany();
  await prisma.admission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.systemSetting.deleteMany();
  await prisma.alumni.deleteMany();

  const settings = [
    { key: "academy_name", value: "Prudential Fashion Academy" },
    { key: "academy_email", value: "info@prudentfashion.academy" },
    { key: "academy_phone", value: "+234 800 000 0000" },
    { key: "academy_address", value: "Lagos, Nigeria" },
    { key: "admissions_open", value: "true" },
    { key: "current_intake", value: "2025" },
    { key: "application_fee", value: "50000" },
    { key: "application_fee_currency", value: "NGN" },
    { key: "asset_logo", value: "/assets/logo.png" },
    { key: "asset_logo_white", value: "/assets/logo-white.png" },
    { key: "asset_favicon", value: "/assets/favicon.ico" },
    { key: "asset_og_image", value: "/assets/og-image.png" },
  ];
  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      create: s,
      update: { value: s.value },
    });
  }

  const templateEvents = [
    "ACCOUNT_CREATED",
    "ADMISSION_RECEIVED",
    "ADMISSION_ACCEPTED",
    "ADMISSION_REJECTED",
    "ADMISSION_WAITLISTED",
    "SCORE_PUBLISHED",
    "PROJECT_REVIEWED",
    "PAYMENT_CONFIRMED",
    "PASSWORD_RESET",
    "WELCOME",
  ];
  for (const event of templateEvents) {
    await prisma.mailTemplate.upsert({
      where: { event },
      create: {
        event,
        subject: `PFA: ${event.replace(/_/g, " ")}`,
        bodyHtml: `<p>Hello {{firstName}},</p><p>This is the ${event} template.</p><p>Regards, PFA</p>`,
        isActive: true,
      },
      update: {},
    });
  }

  const managementUser = await prisma.user.create({
    data: {
      email: "admin@pfa.local",
      passwordHash: HASH,
      firstName: "Admin",
      lastName: "User",
      role: "MANAGEMENT",
    },
  });
  await prisma.management.create({
    data: { userId: managementUser.id, title: "System Administrator" },
  });

  const teacherUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: "teacher1@pfa.local",
        passwordHash: HASH,
        firstName: "Grace",
        lastName: "Okonkwo",
        role: "TEACHER",
      },
    }),
    prisma.user.create({
      data: {
        email: "teacher2@pfa.local",
        passwordHash: HASH,
        firstName: "David",
        lastName: "Adeyemi",
        role: "TEACHER",
      },
    }),
    prisma.user.create({
      data: {
        email: "teacher3@pfa.local",
        passwordHash: HASH,
        firstName: "Amaka",
        lastName: "Nwosu",
        role: "TEACHER",
      },
    }),
  ]);
  const teachers = await Promise.all(
    teacherUsers.map((u) =>
      prisma.teacher.create({
        data: { userId: u.id, title: "Lecturer" },
      })
    )
  );

  const programs = ["Fashion Design", "Fashion Business & Luxury Management", "Styling & Art Direction"];
  const studentUsers = [];
  for (let i = 1; i <= 10; i++) {
    const u = await prisma.user.create({
      data: {
        email: `student${i}@pfa.local`,
        passwordHash: HASH,
        firstName: `Student${i}`,
        lastName: `Last${i}`,
        role: "STUDENT",
      },
    });
    const regNumber = `PFA-2025-FD-${String(i).padStart(5, "0")}`;
    await prisma.student.create({
      data: {
        userId: u.id,
        regNumber,
        program: programs[(i - 1) % programs.length],
        intakeYear: 2025,
      },
    });
    studentUsers.push(u);
  }

  const students = await prisma.student.findMany();
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "Introduction to Fashion Design",
        code: "FD101",
        program: "Fashion Design",
        semester: 1,
        teacherId: teachers[0].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Pattern Making",
        code: "FD102",
        program: "Fashion Design",
        semester: 1,
        teacherId: teachers[0].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Fashion Business Fundamentals",
        code: "FB101",
        program: "Fashion Business & Luxury Management",
        semester: 1,
        teacherId: teachers[1].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Styling Basics",
        code: "ST101",
        program: "Styling & Art Direction",
        semester: 1,
        teacherId: teachers[2].id,
      },
    }),
  ]);

  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < 3; j++) {
      const course = courses[(i + j) % courses.length];
      await prisma.enrollment.upsert({
        where: {
          studentId_courseId: { studentId: students[i].id, courseId: course.id },
        },
        create: { studentId: students[i].id, courseId: course.id },
        update: {},
      });
    }
  }

  const enrollments = await prisma.enrollment.findMany();
  for (const e of enrollments.slice(0, 60)) {
    await prisma.score.create({
      data: {
        studentId: e.studentId,
        courseId: e.courseId,
        score: 60 + Math.floor(Math.random() * 35),
        letterGrade: "B",
        assessmentType: "Exam",
        semester: 1,
      },
    });
  }

  for (const s of students.slice(0, 10)) {
    const enrolls = await prisma.enrollment.findMany({
      where: { studentId: s.id },
      take: 2,
    });
    for (const e of enrolls) {
      await prisma.project.create({
        data: {
          studentId: s.id,
          courseId: e.courseId,
          title: `Project ${s.regNumber}`,
          fileUrl: "https://example.com/file.pdf",
          status: (["SUBMITTED", "APPROVED", "REVISION_REQUESTED"] as const)[Math.floor(Math.random() * 3)],
        },
      });
    }
  }

  for (let i = 0; i < 8; i++) {
    await prisma.admission.create({
      data: {
        firstName: `Applicant${i}`,
        lastName: `Last${i}`,
        email: `applicant${i}@example.com`,
        phone: "+234800000000",
        country: "Nigeria",
        program: programs[i % programs.length],
        intakeYear: 2025,
        statementOfPurpose: "A".repeat(100),
        status: (["PENDING", "ACCEPTED", "REJECTED", "WAITLISTED"] as const)[i % 4],
        paymentStatus: i % 2 === 0 ? "COMPLETED" : "PENDING",
      },
    });
  }

  const admissions = await prisma.admission.findMany({ where: { status: "ACCEPTED" }, take: 2 });
  for (const a of admissions) {
    await prisma.payment.create({
      data: {
        amount: 50000,
        currency: "NGN",
        purpose: "APPLICATION_FEE",
        status: "COMPLETED",
        provider: "PAYSTACK",
        transactionRef: `ref-${a.id}`,
        admissionId: a.id,
        email: a.email,
        name: `${a.firstName} ${a.lastName}`,
      },
    });
  }
  for (const s of students.slice(0, 3)) {
    const u = await prisma.user.findUnique({ where: { id: s.userId } });
    if (u)
      await prisma.payment.create({
        data: {
          amount: 200000,
          currency: "NGN",
          purpose: "TUITION",
          status: "COMPLETED",
          provider: "PAYSTACK",
          studentId: s.id,
          email: u.email,
          name: `${u.firstName} ${u.lastName}`,
        },
      });
  }

  const users = await prisma.user.findMany();
  for (const u of users) {
    for (let n = 0; n < 3; n++) {
      await prisma.notification.create({
        data: {
          userId: u.id,
          title: `Notification ${n + 1}`,
          message: `Sample message ${n + 1}`,
          type: "info",
        },
      });
    }
  }

  const studentCount = await prisma.student.count();
  const teacherCount = await prisma.teacher.count();
  const courseCount = await prisma.course.count();
  const enrollmentCount = await prisma.enrollment.count();
  const scoreCount = await prisma.score.count();
  const projectCount = await prisma.project.count();
  const admissionCount = await prisma.admission.count();
  const paymentCount = await prisma.payment.count();
  const notificationCount = await prisma.notification.count();

  console.log(`
✅ Seed complete:
 - 1 management user
 - ${teacherCount} teachers
 - ${studentCount} students
 - ${courseCount} courses
 - ${enrollmentCount} enrollments
 - ${scoreCount} scores
 - ${projectCount} projects
 - ${admissionCount} admissions
 - ${paymentCount} payments
 - ${notificationCount} notifications
`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
