// TypeScript Definitions for Sovereign Industrial AI Workbench

export type UserRole =
  | 'Administrator'
  | 'Plant Manager'
  | 'Maintenance Engineer'
  | 'Quality Engineer'
  | 'Production Engineer'
  | 'Safety Officer'
  | 'Operator'
  | 'Auditor';

export type DataClassification =
  | 'PUBLIC'
  | 'OPERATIONS'
  | 'ENGINEERING'
  | 'CONFIDENTIAL'
  | 'R&D'
  | 'MANAGEMENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  clearanceLevel: DataClassification;
  lastActive: string;
  permissions: string[];
}

export interface SovereigntyStats {
  externalEgressBytes: number;
  externalApiCalls: number;
  localModelRequests: number;
  docsProcessed: number;
  auditEventsCount: number;
  airGapStatus: 'AIR_GAPPED' | 'RESTRICTED_LOCAL' | 'OFFLINE';
  kmsStatus: 'AES-256-GCM_ACTIVE' | 'LOCAL_HARDWARE_ENCLAVE';
  gpuHealth: 'OPTIMAL' | 'DEGRADED' | 'STANDBY';
  activeNodes: number;
  avgLatencyMs: number;
}

export type ModelCategory =
  | 'General LLM'
  | 'Vision-Language Model'
  | 'Embedding Model'
  | 'Reranker'
  | 'Speech-to-Text'
  | 'Code / Data Model';

export type ModelRuntime =
  | 'vLLM (Local)'
  | 'Ollama (Local)'
  | 'llama.cpp (Local)'
  | 'Triton Server (Private)'
  | 'Sovereign Enclave';

export interface AIModel {
  id: string;
  name: string;
  family: string;
  category: ModelCategory;
  runtime: ModelRuntime;
  contextWindow: number;
  parameters: string;
  quantization: 'FP8' | 'AWQ' | 'BF16' | 'INT4' | 'FP16';
  status: 'ONLINE' | 'STANDBY' | 'LOADED' | 'OFFLINE';
  latencyMs: number;
  vramUsageGB: number;
  isDefault: boolean;
  endpoint: string;
  description: string;
}

export interface IndustrialAgent {
  id: string;
  name: string;
  code: string;
  icon: string;
  category: 'Diagnostics' | 'Operations' | 'Safety' | 'Quality' | 'Intelligence';
  description: string;
  status: 'ACTIVE' | 'IDLE' | 'BUSY' | 'MAINTENANCE';
  allowedModels: string[];
  allowedTools: string[];
  knowledgeSources: string[];
  clearanceLevel: DataClassification;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  requiresApproval: boolean;
  systemPrompt: string;
  totalRuns: number;
  successRate: number;
}

export type StepStatus = 'pending' | 'running' | 'completed' | 'error';

export interface AgentTraceStep {
  id: string;
  agentId: string;
  agentName: string;
  agentIcon: string;
  stepName: string;
  status: StepStatus;
  message: string;
  timestamp: string;
  durationMs: number;
  details?: string;
  evidenceRefs?: string[];
  tokensProcessed?: number;
  modelUsed?: string;
}

export interface MultimodalAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'csv' | 'audio' | 'doc';
  size: string;
  url?: string;
  previewUrl?: string;
  parsedSummary?: string;
  classification?: DataClassification;
  rawData?: any;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'sensor' | 'manual' | 'history' | 'vision' | 'safety';
  source: string;
  snippet: string;
  confidenceBoost: number;
  metric?: string;
  isCrucial: boolean;
}

export interface HumanApproval {
  id: string;
  runId: string;
  actionTitle: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reason: string;
  evidenceCount: number;
  status: 'pending' | 'approved' | 'rejected';
  approverRole?: UserRole;
  approverName?: string;
  timestamp?: string;
  notes?: string;
  generatedWorkOrder?: {
    workOrderId: string;
    targetMachine: string;
    priority: 'URGENT' | 'HIGH' | 'ROUTINE';
    assignedTeam: string;
    instructions: string[];
    spindleThrottleRpm?: number;
    partsRequired: string[];
  };
}

export interface InvestigationRun {
  id: string;
  title: string;
  machineId: string;
  prompt: string;
  attachments: MultimodalAttachment[];
  selectedAgentId: string;
  traceSteps: AgentTraceStep[];
  outputDiagnosis?: string;
  confidence?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence?: EvidenceItem[];
  recommendedActions?: string[];
  status: 'idle' | 'routing' | 'running' | 'awaiting_approval' | 'approved' | 'rejected' | 'completed';
  approvalRequest?: HumanApproval;
  createdAt: string;
  activeModelRouting?: {
    taskDetected: string;
    routedModels: {
      modality: string;
      modelName: string;
      runtime: string;
      confidence: number;
    }[];
  };
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  filename: string;
  fileType: 'PDF' | 'SOP' | 'CAD' | 'CSV' | 'DOCX' | 'TXT';
  department: string;
  classification: DataClassification;
  accessRoles: UserRole[];
  status: 'INDEXED' | 'PROCESSING' | 'PENDING';
  chunksCount: number;
  sizeKb: number;
  uploadedAt: string;
  tags: string[];
  excerpt: string;
  vectorIndexed: boolean;
  fullContent?: string;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  role: UserRole;
  allowedClassifications: DataClassification[];
  allowedAgents: string[];
  allowedTools: string[];
  requiresApprovalFor: ('HIGH_RISK_WORK_ORDERS' | 'PARAMETER_CHANGES' | 'MACHINE_SHUTDOWN' | 'REPORT_EXPORT')[];
  enabled: boolean;
  lastModified: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  eventType:
    | 'AUTHENTICATION'
    | 'DOCUMENT_UPLOAD'
    | 'AI_REQUEST'
    | 'MODEL_ROUTED'
    | 'AGENT_EXECUTION'
    | 'KNOWLEDGE_RETRIEVAL'
    | 'TOOL_EXECUTION'
    | 'APPROVAL_GRANTED'
    | 'APPROVAL_REJECTED'
    | 'REPORT_GENERATED'
    | 'POLICY_VIOLATION_BLOCKED';
  action: string;
  resource: string;
  outcome: 'SUCCESS' | 'BLOCKED' | 'PENDING_APPROVAL' | 'REJECTED';
  details: string;
  ipAddress: string;
  hash: string;
}

export interface IndustrialReport {
  id: string;
  title: string;
  reportType: 'Maintenance Incident' | 'Visual Quality Audit' | 'Safety Handover' | 'Diagnostic Summary';
  machineId: string;
  author: string;
  authorRole: UserRole;
  date: string;
  executiveSummary: string;
  diagnosis: string;
  evidenceSummary: string[];
  actionsTaken: string[];
  approvedBy?: string;
  status: 'DRAFT' | 'APPROVED' | 'ARCHIVED';
  metrics: {
    vibrationPeak?: string;
    tempSpike?: string;
    downtimeSavedEst?: string;
    confidenceScore?: string;
  };
}
