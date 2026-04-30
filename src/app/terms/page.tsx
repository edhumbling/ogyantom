import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardText,
  EnvelopeSimple,
  HandHeart,
  HandsPraying,
  Scales,
  ShieldWarning,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { contactDetails, ministryType, opaninFullName } from "@/lib/site";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Ogya Ntom Prayer Army, covering prayer requests, community standards, testimonies, giving, safeguards, acceptable use, and Ghana compliance orientation.",
  alternates: {
    canonical: "/terms",
  },
};

const policyPillars = [
  {
    title: "Prayer is offered with faith and responsibility.",
    text: "The ministry prays, teaches, encourages, and provides spiritual covering. It does not promise guaranteed outcomes, replace professional care, or invite reckless decisions.",
    icon: HandsPraying,
  },
  {
    title: "Community conduct must honor dignity.",
    text: "Members, visitors, donors, volunteers, and prayer partners must avoid harassment, exploitation, threats, manipulation, gossip, impersonation, unlawful content, and abuse of vulnerable people.",
    icon: UsersThree,
  },
  {
    title: "Compliance is part of stewardship.",
    text: "These terms are designed with Ghana data protection, cybersecurity, electronic communications, corporate governance, welfare, donation, tax, and public-order responsibilities in mind.",
    icon: Scales,
  },
];

const acceptableUses = [
  "Submit genuine prayer requests for yourself or for others where you have a respectful and lawful reason to ask for prayer.",
  "Join prayer watches, online ministry channels, events, and community spaces with reverence, humility, patience, and respect for leadership instructions.",
  "Share testimonies that are truthful, consented, non-defamatory, and careful with third-party information.",
  "Give or support the ministry only through channels provided by the ministry and only from funds or property you are authorized to give.",
  "Contact the ministry for prayer, pastoral encouragement, community information, event questions, giving support, testimony corrections, or privacy requests.",
  "Use website content for personal spiritual growth, prayer, study, and encouragement, while preserving attribution and avoiding commercial misuse.",
];

const prohibitedUses = [
  "Do not submit false prayer requests, fake testimonies, fabricated miracles, impersonated names, fraudulent donation details, or misleading claims.",
  "Do not use ministry channels to harass, shame, stalk, threaten, sexually exploit, financially exploit, or spiritually manipulate another person.",
  "Do not publish, forward, screenshot, or expose another person's prayer request, private testimony, donor detail, or pastoral conversation without permission.",
  "Do not use the website or groups for political campaigning, hate speech, ethnic hostility, religious abuse, illegal fundraising, pyramid schemes, spam, malware, phishing, or unauthorized advertising.",
  "Do not attempt to access restricted systems, scrape private data, interfere with forms, overload services, bypass security, or compromise accounts.",
  "Do not submit content that incites violence, promotes self-harm, exploits children, violates Ghanaian law, infringes intellectual property, invades privacy, or exposes confidential information.",
  "Do not pressure the ministry, volunteers, donors, prayer warriors, or vulnerable people for money, employment, immigration help, romantic attention, medical decisions, or private access.",
];

const ministryBoundaries = [
  {
    title: "No emergency substitution",
    text: "Prayer support is not emergency response. If there is immediate danger, medical emergency, abuse, threat of self-harm, threat to a child, crime in progress, fire, violence, or urgent safety issue, contact emergency services, police, health professionals, trusted family, or local protection services first.",
  },
  {
    title: "No medical, legal, financial, or psychological advice",
    text: "The ministry may pray, encourage, and suggest that a person seek qualified help, but it does not provide medical diagnosis, legal representation, financial planning, investment advice, therapy, psychiatric care, child protection assessment, or professional social work services unless a properly qualified person is separately engaged under clear terms.",
  },
  {
    title: "No guaranteed outcome",
    text: "The prayer army prays with expectancy and surrender to God. The ministry does not guarantee healing, marriage restoration, employment, money, court outcomes, visa outcomes, pregnancy, business success, deliverance timelines, or any specific result.",
  },
  {
    title: "No coercive spiritual authority",
    text: "Ministry leadership, volunteers, and prayer partners must not use spiritual language to control, threaten, isolate, shame, extort, intimidate, or force anyone to give money, disclose private information, stay in a group, attend a meeting, or accept personal contact.",
  },
];

const givingRules = [
  "Giving is voluntary unless a specific paid event, resource, or support arrangement is clearly described before payment.",
  "No person should give under pressure, fear, manipulation, false prophecy, public shaming, or promise of a guaranteed miracle.",
  "Donors are responsible for confirming payment details before sending money or gifts. The ministry is not responsible for funds sent to impersonators, copied numbers, fake pages, or unauthorized accounts.",
  "Donation records may be retained for accountability, reconciliation, audit, tax, dispute, fraud prevention, and governance purposes.",
  "Refund requests are reviewed case by case. Completed voluntary donations may not be refundable where funds have already been used, committed, transferred, or recorded for ministry purposes, unless law or fairness requires otherwise.",
  "Restricted gifts may be refused, redirected with permission, or returned where the restriction is unlawful, impractical, unsafe, exploitative, reputationally harmful, or inconsistent with the ministry's mission.",
];

const complianceBodies = [
  "Data Protection Commission Ghana for data protection rights, data controller obligations, registration, privacy notices, safeguards, breach reporting, and compliance under the Data Protection Act, 2012 (Act 843).",
  "Cyber Security Authority Ghana for cybersecurity incident reporting, online safety, cybercrime coordination, and cybersecurity obligations under the Cybersecurity Act, 2020 (Act 1038).",
  "Office of the Registrar of Companies for entity registration, filings, governance, beneficial ownership, and corporate administration under the Companies Act, 2019 (Act 992) where applicable.",
  "Ghana Revenue Authority for tax, accounting, record keeping, donor documentation, and other revenue obligations where applicable.",
  "Department of Social Welfare and related welfare authorities where activities involve children, widows, orphans, vulnerable persons, social support, community welfare, or safeguarding referrals.",
  "National Communications Authority, electronic communications providers, mobile money providers, banks, and payment processors where communication, telecommunications, payment, or electronic transaction obligations apply.",
];

export default function TermsPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero legal-hero-terms">
        <div className="legal-hero-shell">
          <p className="legal-kicker">Terms of Use</p>
          <h1>Strict ministry terms for prayer, community, testimony, and support.</h1>
          <p>
            These terms govern use of {SITE_NAME}, {ministryType} and remnant
            prayer army led by Chief Prayer Warrior {opaninFullName}. They
            apply to the website, forms, prayer requests, testimonies,
            communication channels, online prayer watches, events, giving,
            volunteer interactions, and ministry content.
          </p>
          <div className="legal-hero-actions">
            <Link href="/privacy" className="home-primary-action">
              Privacy Policy
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
            <a href={`mailto:${contactDetails.email}`} className="home-secondary-action">
              Ask A Question
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="legal-body-section">
        <div className="legal-body-shell">
          <aside className="legal-side-panel" aria-label="Terms summary">
            <p>Effective date</p>
            <strong>30 April 2026</strong>
            <span>
              By using this website or ministry channels, you agree to use them
              lawfully, respectfully, and consistently with these terms. If you
              do not agree, do not submit forms, join groups, or use ministry
              services.
            </span>
          </aside>

          <div className="legal-content">
            <section className="legal-card-grid" aria-label="Terms commitments">
              {policyPillars.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="legal-highlight-card" key={item.title}>
                    <Icon size={30} weight="bold" aria-hidden="true" />
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </section>

            <section className="legal-document">
              <h2>1. Acceptance Of These Terms</h2>
              <p>
                By accessing the website, submitting a prayer request, sending a
                testimony, joining a WhatsApp or Telegram group, attending a
                Google Meet prayer watch, contacting the ministry, giving
                support, volunteering, or using any ministry content, you agree
                to these Terms of Use. These terms are intentionally strict
                because ministry trust is fragile. A person who comes for prayer
                may be grieving, sick, afraid, exposed, poor, young, elderly,
                confused, spiritually distressed, or in need of immediate
                protection. The rules therefore protect reverence, privacy,
                order, safety, truth, accountability, and Ghanaian compliance.
              </p>

              <h2>2. What The Ministry Does</h2>
              <p>
                {SITE_NAME} connects people through structured online prayer,
                morning and evening watches, prayer requests, testimony,
                biblical encouragement, formation, events, digital community,
                and practical compassion. The ministry helps people pray, stand
                in agreement, share burdens, give thanks, learn consistency, and
                support vulnerable people through organized channels.
              </p>
              <p>
                The ministry is not a hospital, clinic, law firm, bank,
                investment adviser, insurance provider, police station, court,
                emergency service, crisis shelter, or licensed counselling
                service. It is a Christian prayer ministry. Its role is
                spiritual encouragement, prayerful support, community
                connection, pastoral sensitivity, and responsible referral where
                needed.
              </p>

              <h2>3. Acceptable Use</h2>
              <ul>
                {acceptableUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>4. Prohibited Use</h2>
              <ul>
                {prohibitedUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>5. Prayer Requests And Pastoral Boundaries</h2>
              <p>
                Prayer requests should be submitted truthfully, respectfully,
                and with only the information needed for prayer. If your request
                concerns another person, use restraint. Do not expose private
                facts, medical details, child information, intimate details,
                financial records, addresses, photographs, legal allegations, or
                confidential documents unless you have a responsible and lawful
                basis to share them.
              </p>
              <p>
                The ministry may edit, summarize, anonymize, route, delay,
                decline, remove, or escalate requests when necessary for safety,
                confidentiality, moderation, prayer order, safeguarding, legal
                compliance, or ministry capacity. The ministry is not required
                to respond to every message, accept every request, keep every
                person in a group, publish every testimony, or provide personal
                follow-up in every matter.
              </p>

              <h2>6. Strict Ministry Boundaries</h2>
              {ministryBoundaries.map((item) => (
                <article className="legal-subsection" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}

              <h2>7. Testimonies, Stories, And Public Content</h2>
              <p>
                Testimonies must be truthful, respectful, and submitted with
                authority to share. The ministry may edit a testimony for
                length, clarity, grammar, dignity, theological tone, privacy,
                search visibility, and safeguarding. The ministry may refuse to
                publish or may remove a testimony if it risks defamation,
                exposes children, identifies a third party without consent,
                reveals sensitive health or family matters, makes unverifiable
                claims, creates safety risk, misleads the public, or conflicts
                with ministry values.
              </p>
              <p>
                By submitting testimony content, you confirm that you have the
                right to submit it and that publication will not violate another
                person&apos;s rights. You may ask for a testimony to be corrected,
                anonymized, or removed, and the ministry will review the request
                in light of privacy, legal, archival, and operational factors.
              </p>

              <h2>8. Giving, Support, Donations, And Gifts In Kind</h2>
              <p>
                The ministry may invite voluntary support for prayer work,
                events, digital infrastructure, community care, widows, orphans,
                vulnerable families, and other ministry needs. Giving must be
                free from manipulation. No donor should be told that a gift
                purchases a miracle, guarantees breakthrough, buys spiritual
                rank, prevents a curse, or gives control over ministry decisions.
              </p>
              <ul>
                {givingRules.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>9. Community Channels And Group Rules</h2>
              <p>
                WhatsApp, Telegram, Google Meet, phone, email, social media,
                and other ministry channels may have additional rules. Group
                administrators may remove posts, mute discussions, close
                threads, limit forwarding, remove members, restrict access,
                report abuse, or preserve evidence where needed for order,
                safety, privacy, or compliance. You must not scrape member
                lists, direct-message vulnerable members for private gain,
                harvest phone numbers, repost group content publicly, or turn a
                prayer space into an advertising channel.
              </p>

              <h2>10. Intellectual Property</h2>
              <p>
                Website text, design, graphics, logos, photographs, videos,
                devotionals, teachings, prayers, event materials, and ministry
                brand elements belong to the ministry or its licensors unless
                otherwise stated. You may use public ministry content for
                personal prayer, study, encouragement, and non-commercial
                sharing with attribution. You may not sell, repackage, scrape,
                impersonate, remove attribution, use the logo deceptively,
                create fake ministry pages, or suggest endorsement without
                permission.
              </p>

              <h2>11. User Content License</h2>
              <p>
                When you submit a prayer request, testimony, message, comment,
                photo, video, audio, document, or other content, you grant the
                ministry permission to receive, store, review, moderate, use,
                edit, display, publish, archive, and remove that content for the
                purpose for which it was submitted and for related ministry,
                safety, compliance, and administrative purposes. Public use of
                testimony content is subject to the privacy commitments in the
                Privacy Policy.
              </p>

              <h2>12. Privacy And Data Protection</h2>
              <p>
                Personal data is handled under the Privacy Policy. These terms
                incorporate that policy by reference. If you submit personal
                data, you agree that the ministry may process it for prayer,
                care, communication, testimony, giving, events, moderation,
                safeguarding, website operation, security, legal compliance, and
                administration as described there.
              </p>

              <h2>13. Ghana Compliance Orientation</h2>
              <p>
                The ministry seeks to operate responsibly in Ghana and to align
                its website and ministry administration with applicable laws,
                rules, and regulator expectations. Depending on the ministry&apos;s
                structure and activities at a given time, relevant bodies and
                frameworks may include:
              </p>
              <ul>
                {complianceBodies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Nothing in these terms should be read as a guarantee that a
                particular regulator has approved, licensed, audited, or
                endorsed the ministry unless that approval is expressly stated
                with current documentation.
              </p>

              <h2>14. Safeguarding, Children, And Vulnerable Persons</h2>
              <p>
                The ministry may refuse private access, remove a person from a
                group, decline a volunteer, report abuse, preserve messages, or
                contact appropriate help where conduct raises safeguarding
                concerns. Adults must not use ministry spaces to groom children,
                pursue sexual contact, request private images, isolate
                vulnerable persons, obtain money by pressure, or exploit prayer
                needs. Any content involving child sexual abuse, exploitation,
                serious threat, trafficking, or immediate harm is forbidden and
                may be reported.
              </p>

              <h2>15. Disclaimers</h2>
              <p>
                The ministry provides the website and channels on an &quot;as is&quot; and
                &quot;as available&quot; basis. The ministry does not promise that every
                page, form, link, group, payment provider, message, event,
                recording, or response will always be available, error-free,
                uninterrupted, secure, or current. Content may be updated,
                corrected, removed, delayed, or unavailable. Ministry content is
                spiritual and informational; it is not professional advice.
              </p>

              <h2>16. Limitation Of Liability</h2>
              <p>
                To the fullest extent permitted by law, the ministry, its
                leaders, volunteers, administrators, partners, and service
                providers are not liable for indirect, incidental, special,
                consequential, punitive, or exemplary losses arising from use of
                the website, prayer channels, events, content, donations,
                communication platforms, third-party services, or inability to
                access ministry services. This limitation does not exclude
                liability that cannot lawfully be excluded.
              </p>

              <h2>17. Suspension, Removal, And Enforcement</h2>
              <p>
                The ministry may warn, restrict, suspend, remove, block, report,
                or refuse service to any person who violates these terms,
                disrupts prayer order, threatens safety, misuses personal data,
                manipulates vulnerable people, impersonates the ministry,
                attacks systems, submits abusive content, or creates legal or
                reputational risk. Enforcement may happen without prior notice
                where urgency, safety, privacy, or legal duty requires it.
              </p>

              <h2>18. Changes To These Terms</h2>
              <p>
                These terms may be updated as the ministry grows, adds features,
                changes service providers, receives regulatory guidance, expands
                giving or event activity, improves safeguarding, or updates its
                governance. Continued use after an update means you accept the
                updated terms.
              </p>

              <h2>19. Contact</h2>
              <p>
                Questions, complaints, takedown requests, privacy concerns,
                testimony corrections, donation questions, and safeguarding
                concerns may be sent to{" "}
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
                Use the contact details on the website for phone or WhatsApp
                support. Do not include more sensitive information than is
                needed to identify and resolve the issue.
              </p>
            </section>

            <section className="legal-closing-band legal-closing-band-terms">
              <ShieldWarning size={32} weight="bold" aria-hidden="true" />
              <div>
                <h2>The rule is reverence with accountability.</h2>
                <p>
                  Use the ministry in a way that honors God, protects people,
                  respects Ghanaian law, preserves confidentiality, and keeps
                  the prayer army safe for those who come carrying real burdens.
                </p>
              </div>
              <HandHeart size={32} weight="bold" aria-hidden="true" />
            </section>

            <section className="legal-action-strip">
              <ClipboardText size={28} weight="bold" aria-hidden="true" />
              <div>
                <strong>Need the privacy rules too?</strong>
                <span>
                  The Privacy Policy explains data collection, prayer request
                  confidentiality, rights, retention, security, and Ghana
                  regulator alignment.
                </span>
              </div>
              <Link href="/privacy">
                Read Privacy
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
