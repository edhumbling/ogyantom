import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Database,
  EnvelopeSimple,
  Gavel,
  HandsPraying,
  LockKey,
  ShieldCheck,
  UserCircleCheck,
} from "@phosphor-icons/react/dist/ssr";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { contactDetails, ministryType, opaninFullName } from "@/lib/site";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Ogya Ntom Prayer Army, covering prayer requests, testimonies, giving, ministry communication, safeguarding, and Ghana data protection alignment.",
  alternates: {
    canonical: "/privacy",
  },
};

const privacyHighlights = [
  {
    title: "Prayer requests are handled with reverence.",
    text: "Requests may include sensitive spiritual, family, health, financial, or personal details. The ministry treats them as confidential pastoral information and shares them only with trusted prayer or ministry workers who need them for prayer, care, moderation, safety, administration, or legal compliance.",
    icon: HandsPraying,
  },
  {
    title: "Ghana data protection alignment is a standing obligation.",
    text: "This policy is designed around Ghana's Data Protection Act, 2012 (Act 843), the Data Protection Commission's registration and accountability expectations, and practical safeguards for collection, use, storage, access, correction, retention, and deletion.",
    icon: ShieldCheck,
  },
  {
    title: "The ministry does not sell personal data.",
    text: "Ogya Ntom Prayer Army does not sell prayer requests, donor information, testimony information, contact details, or community records. Any third-party processing is limited to operating the website, communication channels, security, payment handling, analytics, hosting, and lawful administration.",
    icon: LockKey,
  },
];

const dataCategories = [
  "Identity and contact information, such as name, email address, telephone number, WhatsApp or Telegram profile details, country, city, church or community connection, and preferred contact channel.",
  "Prayer request information, including the words you submit, selected request category, urgency, context, names of people you ask us to pray for, and any follow-up notes you voluntarily provide.",
  "Special category or sensitive information that you choose to disclose, including religious belief, health information, family circumstances, grief, trauma, disability, hardship, employment, finances, housing, migration, safety concerns, or other vulnerable matters.",
  "Testimony information, including your testimony text, name or display name, consent choices, media you provide, dates, edits, and whether you authorize public publication.",
  "Giving and support information, including donation type, payment reference, amount, currency, channel, date, transaction status, donor message, and records needed for reconciliation, tax, audit, fraud prevention, and stewardship.",
  "Ministry participation information, including event registrations, prayer watch attendance signals, group membership, volunteer interest, service roles, pastoral follow-up, communication preferences, and moderation history.",
  "Technical information, including device type, browser, IP address, approximate location derived from technical data, cookies or similar identifiers, page visits, referral source, security logs, error logs, and anti-abuse signals.",
  "Correspondence information, including emails, calls, social media messages, WhatsApp or Telegram conversations, contact form submissions, support requests, complaint records, and administrative replies.",
];

const lawfulPurposes = [
  {
    title: "Prayer, intercession, and pastoral care",
    text: "We process prayer requests so the prayer army can receive, triage, pray over, follow up, and where appropriate refer the person to responsible pastoral, emergency, family, professional, or community support. Where a request contains sensitive information, we restrict access and use the information only for the purpose for which it was entrusted.",
  },
  {
    title: "Community formation and communication",
    text: "We use contact details to send ministry updates, prayer watch information, event notices, devotional encouragement, group instructions, safety notices, and direct replies. We keep communication proportionate, relevant, and respectful of unsubscribe, opt-out, mute, and removal requests.",
  },
  {
    title: "Testimony review and publication",
    text: "We process testimony submissions to verify consent, edit for clarity, remove unnecessary personal data, protect third parties, avoid misleading claims, and publish only what has a clear basis for publication. We may decline or anonymize a testimony when public posting could expose another person, child, family, medical condition, financial need, or legal issue.",
  },
  {
    title: "Giving, support, and stewardship",
    text: "We process donor and transaction information to receive support, reconcile funds, maintain records, respond to donor questions, prevent fraud, support audits, comply with tax and financial obligations, and give transparent account of ministry support where appropriate.",
  },
  {
    title: "Safety, safeguarding, moderation, and abuse prevention",
    text: "We process information to detect spam, impersonation, coercion, harassment, exploitation, unsafe conduct, abusive content, payment fraud, cybersecurity threats, and misuse of prayer channels. Ministry spaces must remain safe for people seeking prayer, including children, vulnerable adults, widows, orphans, and persons in crisis.",
  },
  {
    title: "Legal, regulatory, and governance compliance",
    text: "We keep records and process information where needed for Ghanaian legal obligations, regulatory requests, dispute resolution, governance, accounting, tax, charity or non-profit administration, data protection accountability, cyber incident handling, and lawful cooperation with competent authorities.",
  },
];

const safeguards = [
  "Access to prayer requests is limited to authorized ministry personnel, prayer leaders, administrators, technical service providers, or pastoral workers with a legitimate ministry need.",
  "Prayer leaders and volunteers are expected to treat entrusted information as confidential, avoid gossip, avoid unnecessary screenshots or forwarding, and avoid public disclosure without clear permission.",
  "Sensitive submissions are not used as promotional content unless the person gives clear consent and the ministry has reviewed the content for dignity, third-party privacy, and safeguarding risk.",
  "The ministry aims to minimize data by collecting what is necessary for prayer, care, communication, giving, events, safeguarding, compliance, or website operation.",
  "Where possible, published stories use first names, initials, broad locations, anonymized detail, or edited context to avoid exposing people who did not consent.",
  "Administrative accounts, email accounts, website accounts, payment dashboards, and communication platforms should use appropriate passwords, device security, role-based access, and removal of access when a person no longer serves.",
  "Incidents involving unauthorized access, disclosure, loss, suspected fraud, or serious technical compromise are escalated internally and, where required, reported to relevant bodies such as the Data Protection Commission or Cyber Security Authority.",
];

const rights = [
  "Request access to the personal data the ministry holds about you.",
  "Ask for inaccurate or incomplete personal data to be corrected.",
  "Ask for prayer requests, testimony submissions, or contact details to be deleted where continued retention is not required by law, safety, dispute resolution, accounting, or legitimate ministry administration.",
  "Withdraw consent for public testimony publication or optional communications, recognizing that withdrawal does not automatically erase lawful processing already completed.",
  "Object to unnecessary processing or ask the ministry to restrict how information is used.",
  "Ask for an explanation of how your information was collected, used, shared, secured, or retained.",
  "Complain to the ministry and, where appropriate, to the Data Protection Commission Ghana.",
];

const regulatorLinks = [
  {
    body: "Data Protection Commission Ghana",
    href: "https://dataprotection.org.gh/",
    note: "Privacy, data protection, data controller and processor registration, breach reporting, and data subject rights under Act 843.",
  },
  {
    body: "Cyber Security Authority Ghana",
    href: "https://www.csa.gov.gh/",
    note: "Cybersecurity incident reporting, cybersecurity standards, online safety, and cybersecurity obligations under Act 1038.",
  },
  {
    body: "Office of the Registrar of Companies",
    href: "https://orc.gov.gh/",
    note: "Business, company, governance, registration, filing, and entity administration under Ghana company law.",
  },
  {
    body: "Ghana Revenue Authority",
    href: "https://gra.gov.gh/",
    note: "Tax, record keeping, donation-related administration, and revenue compliance where applicable.",
  },
  {
    body: "Department of Social Welfare",
    href: "https://www.mogcsp.gov.gh/department-of-social-welfare/",
    note: "Welfare, vulnerable persons, children, community care, social protection, and related welfare standards where ministry activities touch those areas.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-hero-shell">
          <p className="legal-kicker">Privacy Policy</p>
          <h1>Strict care for prayer, testimony, giving, and community data.</h1>
          <p>
            This policy explains how {SITE_NAME}, an online prayer ministry and
            remnant prayer army led by Chief Prayer Warrior {opaninFullName},
            collects, uses, protects, shares, and retains personal information
            across prayer requests, testimonies, online watches, ministry
            communication, giving, support, and pastoral follow-up.
          </p>
          <div className="legal-hero-actions">
            <a href={`mailto:${contactDetails.email}`} className="home-primary-action">
              Contact Privacy Lead
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
            </a>
            <Link href="/terms" className="home-secondary-action">
              Terms of Use
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="legal-body-section">
        <div className="legal-body-shell">
          <aside className="legal-side-panel" aria-label="Privacy policy summary">
            <p>Effective date</p>
            <strong>30 April 2026</strong>
            <span>
              This policy is a ministry governance document. It is not a
              substitute for legal advice and does not claim regulator
              certification unless a current certificate is expressly published
              by the ministry.
            </span>
          </aside>

          <div className="legal-content">
            <section aria-label="Privacy commitments">
              <AutoScrollRail
                ariaLabel="privacy commitments"
                className="legal-card-grid"
              >
                {privacyHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className="legal-highlight-card" key={item.title}>
                      <Icon size={30} weight="bold" aria-hidden="true" />
                      <h2>{item.title}</h2>
                      <p>{item.text}</p>
                    </article>
                  );
                })}
              </AutoScrollRail>
            </section>

            <section className="legal-document">
              <h2>1. Who We Are And Why This Policy Is Strict</h2>
              <p>
                {SITE_NAME} is {ministryType} that connects people through
                morning and evening prayer watches, prayer requests, testimony,
                teaching, digital community, events, and practical compassion.
                The ministry receives information at moments when people may be
                deeply vulnerable. A person may ask for prayer about sickness,
                grief, marriage, family conflict, pregnancy, work, debt,
                spiritual oppression, fear, legal pressure, abuse, bereavement,
                addiction, immigration, housing, loneliness, or urgent danger.
                Because of that, privacy is not treated as a decorative website
                statement. It is part of the ministry&apos;s duty of love, order,
                discipline, and accountability.
              </p>
              <p>
                This policy applies to the website, prayer request forms,
                testimony forms, contact forms, email, phone, WhatsApp,
                Telegram, Google Meet, social media, donation or support
                channels, ministry events, volunteer administration, pastoral
                follow-up, and any related system where the ministry collects or
                processes personal data. If a separate notice is displayed for a
                specific campaign, form, event, or payment flow, that notice
                should be read together with this policy.
              </p>

              <h2>2. Ghana Legal And Regulatory Orientation</h2>
              <p>
                The ministry designs this policy to align with Ghana&apos;s Data
                Protection Act, 2012 (Act 843), including principles of
                accountability, lawfulness, purpose specification, compatibility
                of further processing, quality of information, openness,
                security safeguards, and data subject participation. The policy
                also recognizes the Data Protection Commission Ghana as the
                statutory regulator for personal data protection in Ghana and
                recognizes that data controllers and processors that process
                personal data in Ghana are expected to register and maintain
                compliance where the law applies.
              </p>
              <p>
                The ministry also takes account of Ghana&apos;s Cybersecurity Act,
                2020 (Act 1038), the Cyber Security Authority&apos;s role in
                cybersecurity and incident coordination, the Electronic
                Transactions Act, 2008 (Act 772) for electronic communication
                and transactions, the Companies Act, 2019 (Act 992) and Office
                of the Registrar of Companies requirements where entity
                registration or governance applies, Ghana Revenue Authority
                obligations where tax or accounting records are implicated, and
                Department of Social Welfare expectations where outreach touches
                vulnerable persons, children, welfare support, or community
                protection.
              </p>

              <h2>3. Information We Collect</h2>
              <ul>
                {dataCategories.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>4. Why We Process Information</h2>
              {lawfulPurposes.map((item) => (
                <article className="legal-subsection" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}

              <h2>5. Consent, Sensitive Data, And Prayer Requests</h2>
              <p>
                Many prayer requests contain what Ghana law may treat as
                sensitive or special personal data, especially religious belief,
                health, family, and vulnerable-person information. By submitting
                a prayer request, you ask the ministry to process the
                information for prayer, triage, care, moderation, and follow-up.
                You should only include third-party details when you have a
                fair, respectful, and lawful reason to do so. If you submit
                another person&apos;s information, avoid unnecessary detail and do
                not expose private facts that are not needed for prayer.
              </p>
              <p>
                Prayer is not a replacement for emergency services, medical
                treatment, professional counselling, legal advice, financial
                advice, police protection, or child protection intervention. If
                a submission suggests immediate danger, abuse, self-harm,
                exploitation, serious crime, or risk to a child or vulnerable
                person, the ministry may use or disclose information to seek
                urgent help, comply with law, protect life, or protect someone
                from serious harm.
              </p>

              <h2>6. Confidentiality And Internal Access</h2>
              <p>
                The prayer army is built around discipline, not casual
                exposure. Prayer requests should not be treated as social
                content. Ministry workers, administrators, volunteers, and
                prayer leaders are expected to keep requests confidential, avoid
                unnecessary forwarding, avoid screenshots unless operationally
                necessary, and avoid discussing identifiable requests outside
                approved ministry settings. Public prayer may be edited,
                summarized, anonymized, or withheld to protect dignity.
              </p>
              <ul>
                {safeguards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>7. Testimonies And Public Sharing</h2>
              <p>
                A testimony may glorify God and strengthen faith, but it can
                also expose private information. We may review, edit, decline,
                anonymize, delay, or remove testimony content if it includes
                another person&apos;s medical condition, identity, child information,
                family dispute, sexual matter, financial hardship, legal issue,
                workplace matter, or allegation that cannot be responsibly
                published. Submission of a testimony does not guarantee public
                posting. Public posting requires a ministry judgment that the
                testimony is appropriate, respectful, lawful, and not misleading.
              </p>

              <h2>8. Donations, Gifts, And Financial Information</h2>
              <p>
                Where the ministry receives money, digital giving, mobile money,
                bank transfer, card payment, in-kind gifts, event support, or
                other forms of support, it may keep donor and transaction
                records for reconciliation, accountability, fraud prevention,
                donor support, internal governance, audits, tax or regulatory
                compliance, and transparent stewardship. The ministry does not
                intentionally store full card numbers on this website. Payment
                processors, mobile money providers, banks, or other financial
                service providers may process payment details under their own
                terms and legal obligations.
              </p>

              <h2>9. Cookies, Analytics, Logs, And Security Signals</h2>
              <p>
                The website may use technical logs, cookies, analytics,
                security tools, hosting records, or similar technologies to run
                the site, understand page performance, detect errors, protect
                forms from abuse, prevent spam, secure accounts, diagnose
                incidents, and improve accessibility. We should avoid intrusive
                tracking that is unrelated to ministry operation. Where optional
                analytics or marketing tools are introduced, the ministry should
                provide appropriate notice and controls.
              </p>

              <h2>10. Sharing With Third Parties</h2>
              <p>
                We may share information with hosting providers, email
                providers, messaging platforms, payment processors, analytics or
                security providers, professional advisers, auditors, ministry
                administrators, event partners, volunteer coordinators, and
                lawful authorities where necessary. Sharing is limited to the
                purpose for which the information was collected or to a
                compatible purpose required for ministry administration,
                safeguarding, security, legal compliance, or dispute resolution.
                We do not sell personal data.
              </p>

              <h2>11. International Transfers</h2>
              <p>
                Because online ministry uses global infrastructure, information
                may be processed outside Ghana through website hosting,
                communication platforms, cloud services, email services, social
                media, payment providers, or administrative tools. The ministry
                should choose providers with reasonable security commitments and
                should avoid transferring sensitive information more broadly
                than necessary.
              </p>

              <h2>12. Retention</h2>
              <p>
                The ministry keeps information only as long as reasonably
                necessary for prayer, follow-up, testimony administration,
                giving records, event administration, legal compliance, security,
                accounting, safeguarding, dispute resolution, or historical
                ministry records. Some information may be deleted quickly when
                it is no longer useful. Some records, such as donation records,
                consent records, complaint records, incident records, or
                safeguarding records, may need to be kept longer.
              </p>

              <h2>13. Your Rights</h2>
              <ul>
                {rights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>14. Children And Vulnerable Persons</h2>
              <p>
                The ministry does not knowingly invite children to submit
                private information without appropriate care. If a child,
                parent, guardian, teacher, welfare worker, or concerned person
                contacts the ministry, the ministry should handle the
                information with additional restraint. Child protection,
                exploitation, abuse, trafficking, neglect, or serious welfare
                concerns may require escalation to appropriate guardians,
                authorities, social welfare channels, emergency services, or
                competent professionals.
              </p>

              <h2>15. Security Incidents</h2>
              <p>
                If the ministry becomes aware of unauthorized access,
                disclosure, loss, alteration, ransomware, account compromise,
                payment fraud, impersonation, or any event that could affect
                personal data, it should assess the incident, contain it,
                preserve evidence, inform affected people where appropriate,
                improve safeguards, and report to the Data Protection Commission
                or Cyber Security Authority where law or risk requires it.
              </p>

              <h2>16. Contact And Escalation</h2>
              <p>
                For privacy questions, corrections, deletion requests,
                testimony withdrawal, consent withdrawal, complaints, or
                safeguarding concerns, contact{" "}
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
                You may also use the phone or WhatsApp channels listed on the
                site. Please include enough detail for the ministry to identify
                the relevant request without exposing unnecessary additional
                sensitive information.
              </p>
            </section>

            <section className="legal-regulator-panel" aria-labelledby="regulatory-bodies">
              <div>
                <p className="legal-kicker legal-kicker-dark">Ghana compliance map</p>
                <h2 id="regulatory-bodies">Regulatory bodies and public references</h2>
              </div>
              <div className="legal-regulator-grid">
                {regulatorLinks.map((item) => (
                  <a href={item.href} key={item.body} target="_blank" rel="noreferrer">
                    <Gavel size={22} weight="bold" aria-hidden="true" />
                    <strong>{item.body}</strong>
                    <span>{item.note}</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="legal-closing-band">
              <Database size={32} weight="bold" aria-hidden="true" />
              <div>
                <h2>Respect is the standard.</h2>
                <p>
                  Every form, prayer room, testimony, gift, message, and
                  ministry record must be handled in a way that respects God,
                  the person, the family, the vulnerable, the law, and the trust
                  placed in the prayer army.
                </p>
              </div>
              <UserCircleCheck size={32} weight="bold" aria-hidden="true" />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
