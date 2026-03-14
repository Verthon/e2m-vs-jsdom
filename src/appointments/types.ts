export type PolicySection = {
  title: string;
  description: string;
};

export type PolicyDocument = {
  introduction: string;
  sections: PolicySection[];
};

export type TermsOfServiceResponse = PolicyDocument;

export type CancellationPolicyResponse = PolicyDocument;
