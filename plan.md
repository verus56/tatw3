# TAWTOU3 — Plateforme de bénévolat

> **TAWTOU3 / تطوّع** est une plateforme numérique algérienne qui met en relation les bénévoles avec les associations, institutions de jeunesse et organisations qui proposent des opportunités de bénévolat.

---

# 1. OBJECTIF DU PROJET

Créer une interface web moderne, professionnelle et responsive permettant :

* aux bénévoles de découvrir des opportunités de bénévolat ;
* de rechercher et filtrer les opportunités ;
* de postuler aux opportunités ;
* de construire un profil de bénévole ;
* d'accumuler des points grâce aux participations ;
* de débloquer des niveaux et badges ;
* de suivre leurs expériences ;
* de suivre des formations en ligne gratuitement ;
* d'obtenir des certificats après les formations ;
* de payer les certificats avec une carte Edahabia ou avec des points ;
* de participer à des campagnes de dons ;
* aux associations et institutions de publier et gérer leurs opportunités ;
* aux organisations de gérer les candidatures et d'attribuer les points.

---

# 2. IMPORTANT — SCOPE DU PROJET

## Cette première version concerne UNIQUEMENT le Frontend / UI / UX.

NE PAS développer :

* Backend
* Base de données
* API réelle
* Authentification réelle
* Paiement réel
* Système réel de génération PDF
* Système réel de notifications
* Stockage cloud

Utiliser uniquement :

* Mock data
* Local state
* Simulated authentication
* Simulated payments
* Simulated API responses

L'objectif est de construire une interface complète et réaliste pouvant ensuite être connectée à un backend.

---

# 3. TECHNOLOGIES

Utiliser :

* Next.js
* TypeScript
* App Router
* Tailwind CSS
* shadcn/ui
* Lucide React
* Framer Motion
* React Hook Form
* Zod

Structure recommandée :

```text
Next.js
├── App Router
├── TypeScript
├── Tailwind CSS
├── shadcn/ui
├── Lucide Icons
├── Framer Motion
├── React Hook Form
└── Zod
```

---

# 4. DESIGN SYSTEM

## 4.1 Direction artistique

TAWTOU3 doit avoir une identité :

* moderne ;
* jeune ;
* sociale ;
* citoyenne ;
* optimiste ;
* professionnelle ;
* accessible ;
* inspirée des plateformes SaaS modernes.

Ne pas créer une interface ressemblant à un simple dashboard administratif.

Le produit doit donner une impression de :

> communauté + engagement + apprentissage + impact.

---

# 5. COULEURS

## Primary

```text
#0F766E
```

## Primary Dark

```text
#115E59
```

## Secondary

```text
#14B8A6
```

## Accent

```text
#F59E0B
```

## Background

```text
#F8FAFC
```

## Surface

```text
#FFFFFF
```

## Text

```text
#0F172A
```

## Muted

```text
#64748B
```

## Success

```text
#22C55E
```

## Error

```text
#EF4444
```

---

# 6. TYPOGRAPHIE

L'interface est principalement en arabe.

Utiliser une police adaptée à l'arabe comme :

```text
Cairo
```

ou

```text
Tajawal
```

Les textes doivent être parfaitement lisibles sur mobile.

Support obligatoire :

```text
RTL
```

---

# 7. RESPONSIVE DESIGN

La plateforme doit fonctionner parfaitement sur :

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Breakpoints Tailwind :

```text
sm
md
lg
xl
2xl
```

Mobile-first.

---

# 8. TYPES D'UTILISATEURS

Il existe deux types principaux de comptes.

## 8.1 Volunteer

```text
VOLUNTEER
```

Le bénévole peut :

* rechercher des opportunités ;
* filtrer les opportunités ;
* consulter les détails ;
* postuler ;
* sauvegarder des opportunités ;
* suivre ses candidatures ;
* gagner des points ;
* suivre son classement ;
* suivre des formations ;
* obtenir des certificats ;
* faire des dons ;
* gérer son profil.

---

## 8.2 Organization

```text
ORGANIZATION
```

Une organisation peut :

* créer son profil ;
* publier des opportunités ;
* modifier ses opportunités ;
* supprimer une opportunité ;
* gérer les candidatures ;
* accepter/refuser des bénévoles ;
* confirmer une participation ;
* attribuer des points ;
* consulter ses statistiques.

---

# 9. UTILISATEUR NON CONNECTÉ

Un utilisateur Guest peut :

* consulter la page d'accueil ;
* consulter les opportunités ;
* rechercher ;
* filtrer ;
* consulter les détails ;
* consulter les formations ;
* consulter les projets de donation ;
* consulter les organisations.

Mais pour :

* postuler ;
* sauvegarder ;
* suivre une formation ;
* obtenir un certificat ;
* utiliser ses points ;

il doit être connecté.

Afficher alors un modal :

```text
Connectez-vous pour continuer

Pour participer à cette opportunité,
vous devez créer un compte.

[Se connecter]

[Créer un compte]
```

---

# 10. AUTHENTIFICATION

Routes :

```text
/login
/register
```

---

# 11. PAGE LOGIN

Route :

```text
/login
```

Design en deux colonnes sur desktop.

### Gauche

Illustration / branding :

```text
TAWTOU3

Participez.
Apprenez.
Aidez.
Créez un impact.
```

### Droite

Formulaire :

```text
Bienvenue 👋

Email
[________________]

Mot de passe
[________________]

☐ Se souvenir de moi

Mot de passe oublié ?

[Se connecter]

----------------

Ou

[Continuer avec Google]

Vous n'avez pas de compte ?

Créer un compte
```

---

# 12. PAGE REGISTER

Route :

```text
/register
```

Première étape :

```text
Qui êtes-vous ?

[🙋 Je suis un bénévole]

[🏢 Je représente une organisation]
```

---

# 13. REGISTER — VOLUNTEER

Fields :

```text
Nom
Prénom
Email
Téléphone
Mot de passe
Confirmation mot de passe
```

Checkbox :

```text
J'accepte les conditions d'utilisation
```

Button :

```text
Créer mon compte
```

Après création :

```text
Votre compte a été créé 🎉

Souhaitez-vous compléter votre profil ?

[Compléter mon profil]

[Plus tard]
```

---

# 14. PROFIL INITIAL

Le profil peut être ignoré au moment de l'inscription.

Mais lorsqu'un utilisateur veut postuler, les informations obligatoires doivent être demandées.

Informations :

```text
Nom
Prénom
Date de naissance
Téléphone
Wilaya
Commune
Niveau d'étude
Spécialité
Compétences
Bio
Photo
```

---

# 15. REGISTER — ORGANIZATION

Fields :

```text
Nom de l'organisation
Type d'organisation
Email
Téléphone
Wilaya
Commune
Adresse
Numéro d'enregistrement
Description
Logo
```

Après création :

```text
Votre organisation est en cours de vérification.
```

Badge :

```text
En attente de vérification
```

---

# 16. GLOBAL NAVBAR

Desktop :

```text
------------------------------------------------------------

[LOGO TAWTOU3]

الرئيسية
فرص التطوع
التكوينات
التبرعات
عن تطوع

                         🔔
                         [Avatar]
                         حسابي

------------------------------------------------------------
```

---

# 17. MOBILE NAVIGATION

Bottom navigation :

```text
الرئيسية
الفرص
التكوينات
التبرعات
حسابي
```

Icons :

```text
Home
Search
GraduationCap
Heart
User
```

---

# 18. HOME PAGE

Route :

```text
/
```

---

## HERO

Titre :

```text
شارك... تطوّع... اصنع أثرًا
```

Subtitle :

```text
اكتشف فرص التطوع، طوّر مهاراتك،
ساهم في مجتمعك واحصل على نقاط وشهادات
توثق تجربتك.
```

Buttons :

```text
[اكتشف فرص التطوع]

[ابدأ رحلتك]
```

Ajouter une illustration de jeunes bénévoles.

---

# 19. HOME — STATISTICS

Cards :

```text
12,500+
متطوع
```

```text
850+
فرصة تطوع
```

```text
320
مؤسسة وجمعية
```

```text
45,000
ساعة تطوع
```

---

# 20. HOME — OPPORTUNITIES

Titre :

```text
فرص تطوع مميزة
```

Subtitle :

```text
اكتشف الفرص التي تناسب اهتماماتك ومهاراتك.
```

Afficher 6 cards.

Button :

```text
عرض جميع الفرص
```

---

# 21. HOME — HOW IT WORKS

Titre :

```text
كيف تعمل تطوع؟
```

Étapes :

### 01

```text
أنشئ حسابك
```

### 02

```text
اكتشف الفرصة المناسبة
```

### 03

```text
قدم طلبك
```

### 04

```text
تطوع واحصل على نقاط
```

### 05

```text
طور مهاراتك واحصل على شهادات
```

---

# 22. HOME — COURSES

Titre :

```text
تعلم مهارات جديدة
```

Text :

```text
طور مهاراتك من خلال دورات مجانية
مصممة لمساعدتك على أن تكون متطوعًا أكثر تأثيرًا.
```

Afficher 3 courses.

Button :

```text
استكشف جميع التكوينات
```

---

# 23. HOME — DONATIONS

Titre :

```text
ساهم في صناعة الأثر
```

Afficher des projets de donation.

Chaque card :

```text
Image

Title

Description

████████████░░

72,000 / 100,000 DA

72%

[تبرع الآن]
```

---

# 24. HOME — CTA

Section finale :

```text
جاهز لصنع أثر؟

انضم إلى آلاف المتطوعين
وساهم في تغيير مجتمعك.

[ابدأ الآن]
```

---

# 25. FOOTER

```text
TAWTOU3 / تطوع

منصة تجمع المتطوعين بالمؤسسات
والجمعيات لصناعة أثر إيجابي.

روابط

عن تطوع
فرص التطوع
التكوينات
التبرعات
اتصل بنا

تابعنا

Facebook
Instagram
LinkedIn

© 2026 TAWTOU3
```

---

# 26. OPPORTUNITIES

Route :

```text
/opportunities
```

Page :

```text
فرص التطوع
```

---

# 27. SEARCH

Search bar :

```text
🔎 ابحث عن فرصة تطوع...
```

Examples :

```text
تنظيف
تعليم
بيئة
أطفال
رياضة
```

---

# 28. FILTERS

Filters :

```text
الولاية
```

Options :

```text
كل الولايات
أدرار
الشلف
الأغواط
أم البواقي
باتنة
بجاية
بسكرة
بشار
البليدة
البويرة
تمنراست
تبسة
تلمسان
تيارت
تيزي وزو
الجزائر
الجلفة
جيجل
سطيف
سعيدة
سكيكدة
سيدي بلعباس
عنابة
قالمة
قسنطينة
المدية
مستغانم
المسيلة
معسكر
ورقلة
وهران
البيض
إليزي
برج بوعريريج
بومرداس
الطارف
تندوف
تيسمسيلت
الوادي
خنشلة
سوق أهراس
تيبازة
ميلة
عين الدفلى
النعامة
عين تموشنت
غرداية
غليزان
```

---

# 29. FILTER — CATEGORY

```text
البيئة
التعليم
الصحة
الثقافة
الرياضة
التكنولوجيا
التضامن
الأطفال
الشباب
الحيوانات
الإغاثة
التنمية
```

---

# 30. FILTER — DURATION

```text
يوم واحد
2 - 3 أيام
أسبوع
أكثر من أسبوع
طويلة المدى
```

---

# 31. FILTER — TYPE

```text
حضوري
عن بعد
مختلط
```

---

# 32. FILTER — DATE

```text
اليوم
هذا الأسبوع
هذا الشهر
تاريخ مخصص
```

---

# 33. OPPORTUNITY CARD

```text
┌────────────────────────────────┐
│                                │
│             IMAGE              │
│                                │
├────────────────────────────────┤
│ 🌱 البيئة                     │
│                                │
│ تنظيف الشواطئ                 │
│                                │
│ جمعية الأمل                   │
│                                │
│ 📍 بجاية                       │
│ 📅 20 سبتمبر 2026             │
│ ⏱ يوم واحد                    │
│                                │
│ +50 نقطة                      │
│                                │
│ [التفاصيل]             ♡      │
└────────────────────────────────┘
```

---

# 34. OPPORTUNITY DETAILS

Route :

```text
/opportunities/[id]
```

Header :

```text
[Large Image]

تنظيف الشواطئ في بجاية

✓ فرصة موثوقة

جمعية الأمل

📍 بجاية
📅 20 سبتمبر 2026
⏱ يوم واحد
👥 20 متطوع
```

---

# 35. OPPORTUNITY DESCRIPTION

Sections :

```text
عن الفرصة
```

```text
ماذا ستقوم به؟
```

```text
المتطلبات
```

```text
ماذا ستحصل عليه؟
```

---

# 36. BENEFITS

```text
🏆 50 نقطة تطوع
📜 شهادة مشاركة
🤝 تجربة ميدانية
🌱 مساهمة مجتمعية
```

CTA :

```text
[التقدم لهذه الفرصة]
```

---

# 37. APPLICATION FLOW

Button :

```text
التقدم لهذه الفرصة
```

If Guest :

```text
تسجيل الدخول مطلوب

[تسجيل الدخول]
[إنشاء حساب]
```

If profile incomplete :

```text
أكمل معلوماتك

هذه المعلومات ضرورية للتقدم
لهذه الفرصة.
```

Form :

```text
الاسم واللقب
رقم الهاتف
الولاية
البلدية
المستوى الدراسي
التخصص
المهارات
نبذة عنك
```

Button :

```text
إرسال الطلب
```

Success :

```text
✓ تم إرسال طلبك بنجاح

ستصلك notification عند تحديث
حالة طلبك.
```

---

# 38. MY APPLICATIONS

Route :

```text
/profile/applications
```

Tabs :

```text
الكل
قيد المراجعة
مقبول
مكتمل
مرفوض
```

Card :

```text
تنظيف الشواطئ

جمعية الأمل

20 سبتمبر 2026

✓ مكتمل

+50 نقطة
```

---

# 39. SAVED OPPORTUNITIES

Route :

```text
/profile/saved
```

Title :

```text
الفرص المحفوظة
```

Empty state :

```text
لم تحفظ أي فرصة بعد.

[اكتشف فرص التطوع]
```

---

# 40. VOLUNTEER PROFILE

Route :

```text
/profile
```

Header :

```text
[Avatar]

محمد أحمد

متطوع نشط

📍 الجزائر العاصمة

350 نقطة
```

---

# 41. PROFILE STATISTICS

```text
12
تطوع
```

```text
350
نقطة
```

```text
8
شهادات
```

```text
42
ساعة تطوع
```

---

# 42. VOLUNTEER LEVEL

Levels :

```text
مبتدئ
↓
متطوع
↓
متطوع نشط
↓
متطوع متميز
↓
سفير تطوع
```

Progress :

```text
متطوع نشط

████████████░░

350 / 450 نقطة
```

---

# 43. POINTS

Route :

```text
/profile/points
```

Current balance :

```text
350 نقطة
```

History :

```text
+50
تنظيف الشواطئ

+30
توزيع مساعدات

+70
تنظيم فعالية

-100
الحصول على شهادة
```

---

# 44. ACHIEVEMENTS

Badges :

```text
🏅 أول تطوع
🌱 متطوع بيئي
🤝 10 تطوعات
🎓 متعلم نشط
🏆 500 نقطة
⭐ متطوع متميز
```

Locked :

```text
🔒
```

---

# 45. LEADERBOARD

Route :

```text
/leaderboard
```

Title :

```text
لوحة المتطوعين
```

Tabs :

```text
هذا الشهر
هذا العام
كل الأوقات
```

Cards :

```text
🥇 أحمد
1,250 نقطة

🥈 سارة
1,120 نقطة

🥉 أمين
980 نقطة
```

---

# 46. ACTIVITY TIMELINE

```text
نشاطاتي
```

Example :

```text
🏆 حصلت على 50 نقطة
تنظيف الشواطئ

📜 حصلت على شهادة
أساسيات العمل التطوعي

🤝 شاركت في
حملة تشجير

⭐ وصلت إلى مستوى متطوع نشط
```

---

# 47. COURSES

Route :

```text
/courses
```

Title :

```text
التكوينات
```

Subtitle :

```text
تعلم مهارات جديدة تساعدك
على أن تكون متطوعًا أكثر تأثيرًا.
```

---

# 48. COURSE CATEGORIES

```text
القيادة
التواصل
الإسعافات الأولية
إدارة المشاريع
العمل الجمعوي
التكنولوجيا
التنمية الشخصية
إدارة الفعاليات
```

---

# 49. COURSE CARD

```text
┌────────────────────────────┐
│                            │
│          IMAGE             │
│                            │
├────────────────────────────┤
│ العمل التطوعي              │
│                            │
│ ⭐ 4.8                     │
│ 👥 1,240 متعلم            │
│                            │
│ 6 دروس                     │
│ 2h 30min                   │
│                            │
│ 🟢 مجاني                   │
│                            │
│ [ابدأ الدورة]             │
└────────────────────────────┘
```

---

# 50. COURSE DETAILS

Route :

```text
/courses/[id]
```

Show :

```text
Title
Image
Rating
Number of learners
Duration
Number of lessons
Instructor
Description
Learning outcomes
Curriculum
```

---

# 51. COURSE CURRICULUM

Example :

```text
01 المقدمة
02 مفهوم التطوع
03 العمل الجماعي
04 التواصل
05 إدارة المبادرات
06 الاختبار النهائي
```

---

# 52. LEARNING PAGE

Route :

```text
/courses/[id]/learn
```

Layout :

```text
------------------------------------------------
                    VIDEO
------------------------------------------------

أساسيات العمل التطوعي

[السابق]                         [التالي]

------------------------------------------------

محتوى الدورة

✓ 01 المقدمة
✓ 02 مفهوم التطوع
▶ 03 العمل الجماعي
🔒 04 التواصل
🔒 05 إدارة المبادرات
🔒 06 الاختبار النهائي

------------------------------------------------

65% مكتمل
██████████████░░
```

---

# 53. COURSE COMPLETION

Après la dernière leçon :

```text
🎉 أحسنت!

لقد أكملت الدورة بنجاح.
```

Afficher :

```text
الحصول على الشهادة
```

Prix :

```text
1500 دج
```

Alternative :

```text
أو 100 نقطة تطوع
```

---

# 54. CERTIFICATE CHECKOUT

Route :

```text
/checkout
```

Title :

```text
الحصول على الشهادة
```

Course :

```text
أساسيات العمل التطوعي
```

Price :

```text
1500 DA
```

Payment methods :

```text
○ البطاقة الذهبية

○ نقاط التطوع
```

---

# 55. EDAHABIA UI

Show :

```text
رقم البطاقة
[________________]

تاريخ الانتهاء
[____]

CVV
[___]
```

Button :

```text
دفع 1500 دج
```

IMPORTANT:

This is ONLY a mock payment interface.

Do not connect to a real payment gateway.

---

# 56. POINTS PAYMENT

If points selected :

```text
رصيدك الحالي

350 نقطة

تكلفة الشهادة

100 نقطة

الرصيد après achat

250 نقطة
```

Button :

```text
استخدام 100 نقطة
```

Success :

```text
✓ تم استخدام النقاط

تمت إضافة الشهادة إلى ملفك.
```

---

# 57. CERTIFICATES

Route :

```text
/profile/certificates
```

Card :

```text
🏆 شهادة

أساسيات العمل التطوعي

20 سبتمبر 2026

Certificate ID:
TW-2026-00125

[عرض الشهادة]
[تحميل PDF]
```

Download is mock in this version.

---

# 58. CERTIFICATE VIEW

Create a visually attractive certificate:

```text
--------------------------------------------

                 TAWTOU3

                   شهادة

             محمد أحمد

      أتم بنجاح دورة

       أساسيات العمل التطوعي

             20 سبتمبر 2026

        Certificate ID:
        TW-2026-00125

             تطوّع
--------------------------------------------
```

---

# 59. DONATIONS

Route :

```text
/donations
```

Hero :

```text
تبرعك يمكن أن يصنع فرقًا
```

Subtitle :

```text
ساهم في دعم المبادرات والمشاريع
التي تصنع أثرًا في المجتمع.
```

---

# 60. DONATION PROJECT CARD

```text
[IMAGE]

دعم الأطفال المحتاجين

مساعدة 100 طفل من العائلات المحتاجة.

██████████████░░

72,000 / 100,000 DA

72%

[تبرع الآن]
```

---

# 61. DONATION DETAILS

Route :

```text
/donations/[id]
```

Show :

```text
Image
Title
Description
Objective
Target
Raised
Progress
Organization
Updates
```

Donation amount :

```text
[500]
[1000]
[2000]
[5000]

أو مبلغ مخصص
```

Button :

```text
تبرع الآن
```

---

# 62. ORGANIZATION DASHBOARD

Route :

```text
/organization/dashboard
```

Header :

```text
مرحبًا، جمعية الأمل 👋
```

Statistics :

```text
12
الفرص المنشورة
```

```text
84
طلبات التطوع
```

```text
57
المتطوعون
```

```text
340
ساعات التطوع
```

CTA :

```text
+ نشر فرصة جديدة
```

---

# 63. ORGANIZATION OPPORTUNITIES

Route :

```text
/organization/opportunities
```

Tabs :

```text
الكل
منشورة
مسودة
منتهية
```

Table :

```text
الفرصة
الحالة
التاريخ
المتقدمون
الإجراءات
```

Actions :

```text
عرض
تعديل
حذف
```

---

# 64. CREATE OPPORTUNITY

Route :

```text
/organization/opportunities/new
```

Form :

```text
عنوان الفرصة

وصف الفرصة

المجال

الولاية

البلدية

تاريخ البداية

تاريخ النهاية

عدد المتطوعين

المهارات المطلوبة

نوع التطوع

النقاط

الصورة
```

Type :

```text
حضوري
عن بعد
مختلط
```

Buttons :

```text
[حفظ كمسودة]

[نشر الفرصة]
```

---

# 65. EDIT OPPORTUNITY

Route :

```text
/organization/opportunities/[id]/edit
```

Same form.

Button :

```text
حفظ التغييرات
```

---

# 66. ORGANIZATION VOLUNTEERS

Route :

```text
/organization/volunteers
```

Table :

```text
المتطوع
الفرصة
الحالة
التاريخ
النقاط
الإجراء
```

Example :

```text
محمد أحمد
تنظيف الشواطئ
مكتمل
20/09/2026
50
[تقييم]
```

---

# 67. CONFIRM PARTICIPATION

Modal :

```text
تأكيد مشاركة المتطوع

محمد أحمد

هل أكمل المتطوع المهمة؟

○ نعم
○ لا

النقاط:

[50]

التقييم:

⭐⭐⭐⭐⭐

[تأكيد]
```

After confirmation:

```text
✓ تمت إضافة 50 نقطة إلى حساب المتطوع.
```

---

# 68. ORGANIZATION PROFILE

Route :

```text
/organization/profile
```

Design :

```text
[COVER IMAGE]

[LOGO]

جمعية الأمل

✓ مؤسسة موثقة

📍 بجاية

عن المؤسسة

...

إحصائيات

57 متطوع
12 فرصة
340 ساعة
```

---

# 69. ORGANIZATION PUBLIC PROFILE

Create public organization page:

```text
/organizations/[id]
```

Show :

* Cover
* Logo
* Name
* Verification
* Description
* Location
* Contact
* Opportunities
* Statistics

---

# 70. NOTIFICATIONS

Notification dropdown :

```text
🔔 الإشعارات
```

Examples :

```text
✓ تم قبول طلبك

تنظيف الشواطئ

+50 نقطة

حصلت على شهادة جديدة

أساسيات العمل التطوعي

فرصة جديدة في ولايتك

حملة تشجير
```

---

# 71. SEARCH GLOBAL

Navbar search :

```text
ابحث عن فرص تطوع، دورات، مؤسسات...
```

Results :

```text
الكل
فرص التطوع
التكوينات
المؤسسات
```

---

# 72. EMPTY STATES

Every page must have an appropriate empty state.

Example :

```text
لا توجد فرص تطوع مطابقة.

جرّب تعديل الفلاتر.

[إزالة الفلاتر]
```

Saved :

```text
لم تحفظ أي فرصة بعد.

[اكتشف الفرص]
```

Certificates :

```text
لم تحصل على أي شهادة بعد.

[استكشف التكوينات]
```

Applications :

```text
لا توجد طلبات بعد.

[اكتشف فرص التطوع]
```

---

# 73. LOADING STATES

Use Skeleton components for :

```text
OpportunityCard
CourseCard
Profile
Dashboard
Organization
Leaderboard
```

Do not display blank screens.

---

# 74. ERROR STATES

Example :

```text
حدث خطأ ما.

لم نتمكن من تحميل البيانات.

[إعادة المحاولة]
```

---

# 75. TOASTS

Use toast notifications.

Examples :

```text
✓ تم حفظ الفرصة
```

```text
✓ تم إرسال الطلب
```

```text
✓ تمت إضافة الفرصة إلى المحفوظات
```

```text
✓ تم الحصول على الشهادة
```

---

# 76. MODALS

Use modal/dialog components for :

* Login required
* Complete profile
* Application confirmation
* Delete opportunity
* Confirm participation
* Payment confirmation
* Certificate purchase
* Logout

---

# 77. GAMIFICATION

The point system is central to the product.

Example :

```text
Participation
      ↓
Organization validates participation
      ↓
Points awarded
      ↓
Volunteer profile updated
      ↓
Level progress
      ↓
Leaderboard
      ↓
Points can be used for certificates
```

---

# 78. LEVEL SYSTEM

Use:

```text
0 - 99
مبتدئ
```

```text
100 - 249
متطوع
```

```text
250 - 499
متطوع نشط
```

```text
500 - 999
متطوع متميز
```

```text
1000+
سفير تطوع
```

---

# 79. ACHIEVEMENTS

Create mock achievement definitions:

```text
first_volunteer
first_course
10_volunteering
500_points
environment_volunteer
community_helper
learning_champion
```

---

# 80. MOCK DATA

Create :

```text
/lib/mock-data.ts
```

Include :

```text
users
organizations
opportunities
applications
courses
lessons
certificates
donations
notifications
achievements
leaderboard
```

---

# 81. MOCK USER

```ts
{
  id: "user-001",
  firstName: "محمد",
  lastName: "أحمد",
  email: "mohamed@example.com",
  role: "volunteer",
  wilaya: "الجزائر",
  commune: "الجزائر الوسطى",
  points: 350,
  volunteerHours: 42,
  completedOpportunities: 12,
  certificates: 8,
  level: "متطوع نشط"
}
```

---

# 82. MOCK ORGANIZATION

```ts
{
  id: "org-001",
  name: "جمعية الأمل",
  type: "association",
  wilaya: "بجاية",
  verified: true,
  opportunitiesCount: 12,
  volunteersCount: 57
}
```

---

# 83. MOCK OPPORTUNITY

```ts
{
  id: "opp-001",
  title: "تنظيف الشواطئ",
  description: "مبادرة بيئية لتنظيف الشاطئ...",
  organizationId: "org-001",
  category: "البيئة",
  wilaya: "بجاية",
  commune: "بجاية",
  duration: "يوم واحد",
  type: "حضوري",
  points: 50,
  volunteersNeeded: 20,
  volunteersRegistered: 13,
  status: "open"
}
```

---

# 84. COMPONENT ARCHITECTURE

Create reusable components.

```text
components/
```

## Layout

```text
Navbar
MobileNavbar
Footer
PageHeader
Container
```

## Opportunities

```text
OpportunityCard
OpportunityGrid
OpportunityFilters
OpportunitySearch
OpportunityStatus
OpportunityDetails
ApplicationModal
```

## Courses

```text
CourseCard
CourseGrid
CourseDetails
CourseSidebar
CourseProgress
LessonPlayer
LessonList
CertificateCard
```

## Profile

```text
ProfileHeader
ProfileStats
PointsCard
LevelProgress
AchievementBadge
ActivityTimeline
CertificateCard
```

## Organization

```text
OrganizationCard
OrganizationHeader
DashboardStats
VolunteerTable
OpportunityForm
OrganizationOpportunityCard
```

## Donations

```text
DonationCard
DonationProgress
DonationForm
DonationAmountSelector
```

## UI

Use shadcn/ui :

```text
Button
Card
Dialog
DropdownMenu
Input
Select
Tabs
Badge
Avatar
Progress
Table
Toast
Tooltip
Sheet
Skeleton
Checkbox
RadioGroup
```

---

# 85. FOLDER STRUCTURE

Recommended:

```text
app/
├── page.tsx
│
├── login/
│   └── page.tsx
│
├── register/
│   └── page.tsx
│
├── opportunities/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
│
├── courses/
│   ├── page.tsx
│   └── [id]/
│       ├── page.tsx
│       └── learn/
│           └── page.tsx
│
├── donations/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
│
├── leaderboard/
│   └── page.tsx
│
├── profile/
│   ├── page.tsx
│   ├── points/
│   │   └── page.tsx
│   ├── certificates/
│   │   └── page.tsx
│   ├── applications/
│   │   └── page.tsx
│   └── saved/
│       └── page.tsx
│
├── organization/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── opportunities/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx
│   ├── volunteers/
│   │   └── page.tsx
│   └── profile/
│       └── page.tsx
│
└── checkout/
    └── page.tsx
```

---

# 86. LIB

```text
lib/
├── mock-data.ts
├── constants.ts
├── utils.ts
└── types.ts
```

---

# 87. TYPES

Create TypeScript interfaces :

```ts
User
Organization
Opportunity
Application
Course
Lesson
Certificate
Donation
Notification
Achievement
PointTransaction
```

---

# 88. STATE

For the UI prototype, use local React state.

Example states :

```text
isAuthenticated
currentUser
savedOpportunities
applications
points
notifications
courseProgress
certificatePurchased
```

No backend required.

---

# 89. FAKE AUTH

Implement a simple demo authentication.

Example :

```text
Login
→ choose mock user
→ store user in localStorage
```

Create two demo accounts:

```text
Volunteer
Organization
```

Provide a small development-only switch if useful:

```text
[Demo Volunteer]

[Demo Organization]
```

---

# 90. FAKE PAYMENT

Certificate purchase should simulate :

```text
Click payment
↓
Loading
↓
Success
↓
Certificate added
```

Example :

```text
Paiement en cours...

██████████████

✓ Paiement réussi
✓ Certificat ajouté
```

---

# 91. COURSE LOGIC

Course starts at :

```text
0%
```

Each lesson increases progress.

Example :

```text
1 / 6
16%
```

At :

```text
100%
```

show certificate CTA.

---

# 92. CERTIFICATE LOGIC

Two purchase options:

```text
1500 DZD
```

or :

```text
100 points
```

Mock logic :

```text
if points >= 100:
    allow points purchase
else:
    disable points option
```

Display :

```text
Vous avez 350 points.

Vous pouvez utiliser 100 points
pour obtenir cette certification.
```

---

# 93. ACCESSIBILITY

Must include :

* semantic HTML
* labels for inputs
* keyboard navigation
* visible focus
* sufficient contrast
* alt text
* accessible dialogs
* accessible dropdowns
* accessible buttons
* RTL correctness

---

# 94. RTL

The root layout must use :

```html
<html lang="ar" dir="rtl">
```

All layout components must work correctly in RTL.

Icons such as arrows should adapt according to direction.

---

# 95. MOBILE UX

On mobile:

* cards become single-column;
* filters open in a Sheet;
* navbar becomes bottom navigation;
* dashboard tables become cards;
* profile stats become 2-column grid;
* course sidebar becomes collapsible;
* CTA buttons become full width.

---

# 96. DESKTOP UX

On desktop:

* max-width around 1280px;
* generous whitespace;
* 3 or 4-column grids;
* sidebar filters for opportunities;
* course sidebar;
* dashboard sidebar;
* sticky CTAs where appropriate.

---

# 97. ANIMATIONS

Use Framer Motion.

Animations:

```text
Hero fade-in
Card hover
Page entrance
Modal transition
Progress animation
Achievement unlock
Toast animation
```

Keep animations subtle.

Do not over-animate the UI.

---

# 98. ICONS

Use Lucide React.

Examples :

```text
Search
MapPin
Calendar
Clock
Users
Heart
Bookmark
Bell
User
Award
GraduationCap
HeartHandshake
Building2
Gift
Trophy
Star
CheckCircle
ArrowLeft
ArrowRight
Filter
SlidersHorizontal
```

Do not use random emoji as the primary UI icon system.

Emoji may only be used in achievement/gamification content where appropriate.

---

# 99. IMAGE HANDLING

Use image placeholders/mock images.

Avoid broken image URLs.

Create a consistent visual style.

Opportunity images should represent:

* environment
* education
* charity
* children
* sports
* technology
* community activities

Course images should represent:

* communication
* leadership
* first aid
* project management
* volunteering

---

# 100. HOME USER JOURNEY

The main journey should be:

```text
HOME
 ↓
Discover opportunities
 ↓
Search / Filter
 ↓
Opportunity details
 ↓
Apply
 ↓
Login
 ↓
Complete profile
 ↓
Submit application
 ↓
Application confirmation
```

---

# 101. VOLUNTEER JOURNEY

```text
Register
 ↓
Complete profile
 ↓
Discover opportunity
 ↓
Apply
 ↓
Accepted
 ↓
Participate
 ↓
Organization confirms
 ↓
Points received
 ↓
Level increases
 ↓
Leaderboard updated
```

---

# 102. LEARNING JOURNEY

```text
Courses
 ↓
Course details
 ↓
Start course
 ↓
Watch lesson
 ↓
Next lesson
 ↓
Complete course
 ↓
Certificate
 ↓
1500 DZD OR 100 points
 ↓
Certificate added to profile
```

---

# 103. ORGANIZATION JOURNEY

```text
Register organization
 ↓
Organization profile
 ↓
Dashboard
 ↓
Create opportunity
 ↓
Publish
 ↓
Receive applications
 ↓
Accept volunteers
 ↓
Volunteer participates
 ↓
Confirm participation
 ↓
Award points
```

---

# 104. DONATION JOURNEY

```text
Donations
 ↓
Donation project
 ↓
Choose amount
 ↓
Payment UI
 ↓
Success
```

---

# 105. DESIGN RULES

DO:

* Use rounded cards.
* Use clear visual hierarchy.
* Use large headings.
* Use generous spacing.
* Use consistent colors.
* Use consistent iconography.
* Use meaningful empty states.
* Use realistic Arabic content.
* Use smooth transitions.
* Make every CTA clear.

DO NOT:

* Create generic Bootstrap-looking pages.
* Use excessive gradients.
* Use excessive glassmorphism.
* Use random colors.
* Use tiny text.
* Use overcrowded dashboards.
* Leave routes as blank placeholders.
* Use Lorem Ipsum.
* Build backend functionality.

---

# 106. FINAL QUALITY CHECK

Before considering the UI complete, verify:

## Navigation

* [ ] Navbar works
* [ ] Mobile navbar works
* [ ] All routes work
* [ ] Back navigation works

## Authentication

* [ ] Login UI
* [ ] Register volunteer
* [ ] Register organization
* [ ] Profile completion

## Opportunities

* [ ] Search
* [ ] Filters
* [ ] Cards
* [ ] Details
* [ ] Apply
* [ ] Save

## Volunteer

* [ ] Profile
* [ ] Points
* [ ] Levels
* [ ] Achievements
* [ ] Leaderboard
* [ ] Applications
* [ ] Saved opportunities

## Courses

* [ ] Course list
* [ ] Course details
* [ ] Lessons
* [ ] Progress
* [ ] Completion
* [ ] Certificate

## Payment

* [ ] Edahabia UI
* [ ] Points payment
* [ ] Success state
* [ ] Failure state

## Donations

* [ ] Projects
* [ ] Details
* [ ] Amount selection
* [ ] Payment UI

## Organization

* [ ] Dashboard
* [ ] Opportunities
* [ ] Create
* [ ] Edit
* [ ] Applications
* [ ] Volunteers
* [ ] Participation confirmation
* [ ] Points assignment
* [ ] Organization profile

## UX

* [ ] Loading states
* [ ] Empty states
* [ ] Error states
* [ ] Toasts
* [ ] Modals
* [ ] Responsive
* [ ] RTL
* [ ] Accessibility

---

# 107. FINAL PRODUCT PRINCIPLE

TAWTOU3 should feel like a combination of:

```text
Volunteer Marketplace
        +
Learning Platform
        +
Gamification
        +
Community Platform
        +
Donation Platform
```

The core loop is:

```text
DISCOVER
   ↓
VOLUNTEER
   ↓
EARN POINTS
   ↓
LEARN
   ↓
GET CERTIFIED
   ↓
BUILD YOUR PROFILE
   ↓
DISCOVER MORE OPPORTUNITIES
```

The organization loop is:

```text
CREATE OPPORTUNITY
        ↓
RECEIVE VOLUNTEERS
        ↓
MANAGE PARTICIPATION
        ↓
CONFIRM CONTRIBUTION
        ↓
AWARD POINTS
        ↓
BUILD COMMUNITY
```

The UI should make these loops obvious and easy to understand.

---

# 108. EXPECTED RESULT

At the end, the project should contain a complete frontend prototype of TAWTOU3 with:

* polished landing page;
* complete volunteer experience;
* complete organization experience;
* volunteering marketplace;
* advanced filters;
* profiles;
* points;
* gamification;
* leaderboard;
* achievements;
* courses;
* lesson player;
* course progress;
* certificates;
* mock Edahabia payment;
* points-based certificate purchase;
* donation platform;
* notifications;
* responsive mobile experience;
* RTL Arabic interface;
* reusable component architecture;
* realistic mock data.

The application should be visually coherent and feel like a real product ready to be connected to a backend later.
