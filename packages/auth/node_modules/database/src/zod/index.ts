import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','walletAddress','role','name','avatarUrl','createdAt','hashedPassword','onboardingComplete']);

export const UserSessionScalarFieldEnumSchema = z.enum(['id','userId','expiresAt','impersonatorId']);

export const UserOauthAccountScalarFieldEnumSchema = z.enum(['id','providerId','providerUserId','userId']);

export const UserVerificationTokenScalarFieldEnumSchema = z.enum(['id','userId','expires']);

export const UserOneTimePasswordScalarFieldEnumSchema = z.enum(['id','userId','code','type','identifier','expires']);

export const TeamScalarFieldEnumSchema = z.enum(['id','name','avatarUrl']);

export const TeamMembershipScalarFieldEnumSchema = z.enum(['id','teamId','userId','role','isCreator']);

export const TeamInvitationScalarFieldEnumSchema = z.enum(['id','teamId','email','role','createdAt','expiresAt']);

export const SubscriptionScalarFieldEnumSchema = z.enum(['id','teamId','customerId','status','planId','variantId','nextPaymentDate']);

export const ScoreScalarFieldEnumSchema = z.enum(['id','userId','score','Token','Status','createdAt']);

export const TaskScalarFieldEnumSchema = z.enum(['id','type','userId','status','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserRoleSchema = z.enum(['USER','ADMIN']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const UserOneTimePasswordTypeSchema = z.enum(['SIGNUP','LOGIN','PASSWORD_RESET']);

export type UserOneTimePasswordTypeType = `${z.infer<typeof UserOneTimePasswordTypeSchema>}`

export const TeamMemberRoleSchema = z.enum(['MEMBER','OWNER']);

export type TeamMemberRoleType = `${z.infer<typeof TeamMemberRoleSchema>}`

export const SubscriptionStatusSchema = z.enum(['TRIALING','ACTIVE','PAUSED','CANCELED','PAST_DUE','UNPAID','INCOMPLETE','EXPIRED']);

export type SubscriptionStatusType = `${z.infer<typeof SubscriptionStatusSchema>}`

export const ScoreStatusSchema = z.enum(['WITHDRAW_UNPAID','WITHDRAW_PENDING','WITHDRAW_COMPLETE']);

export type ScoreStatusType = `${z.infer<typeof ScoreStatusSchema>}`

export const TaskStatusSchema = z.enum(['DONE','FAILED','PENDING']);

export type TaskStatusType = `${z.infer<typeof TaskStatusSchema>}`

export const TaskTypeSchema = z.enum(['DAILY_CHECKIN','JOIN_DISCORD','JOIN_TELEGRAM','SHARE_DISCORD','SHARE_TELEGRAM']);

export type TaskTypeType = `${z.infer<typeof TaskTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.string().cuid(),
  walletAddress: z.string(),
  name: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  hashedPassword: z.string().nullable(),
  onboardingComplete: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER SESSION SCHEMA
/////////////////////////////////////////

export const UserSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.coerce.date(),
  impersonatorId: z.string().nullable(),
})

export type UserSession = z.infer<typeof UserSessionSchema>

/////////////////////////////////////////
// USER OAUTH ACCOUNT SCHEMA
/////////////////////////////////////////

export const UserOauthAccountSchema = z.object({
  id: z.string().cuid(),
  providerId: z.string(),
  providerUserId: z.string(),
  userId: z.string(),
})

export type UserOauthAccount = z.infer<typeof UserOauthAccountSchema>

/////////////////////////////////////////
// USER VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const UserVerificationTokenSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type UserVerificationToken = z.infer<typeof UserVerificationTokenSchema>

/////////////////////////////////////////
// USER ONE TIME PASSWORD SCHEMA
/////////////////////////////////////////

export const UserOneTimePasswordSchema = z.object({
  type: UserOneTimePasswordTypeSchema,
  id: z.string().cuid(),
  userId: z.string(),
  code: z.string(),
  identifier: z.string(),
  expires: z.coerce.date(),
})

export type UserOneTimePassword = z.infer<typeof UserOneTimePasswordSchema>

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  avatarUrl: z.string().nullable(),
})

export type Team = z.infer<typeof TeamSchema>

/////////////////////////////////////////
// TEAM MEMBERSHIP SCHEMA
/////////////////////////////////////////

export const TeamMembershipSchema = z.object({
  role: TeamMemberRoleSchema,
  id: z.string().cuid(),
  teamId: z.string(),
  userId: z.string(),
  isCreator: z.boolean(),
})

export type TeamMembership = z.infer<typeof TeamMembershipSchema>

/////////////////////////////////////////
// TEAM INVITATION SCHEMA
/////////////////////////////////////////

export const TeamInvitationSchema = z.object({
  role: TeamMemberRoleSchema,
  id: z.string().cuid(),
  teamId: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
})

export type TeamInvitation = z.infer<typeof TeamInvitationSchema>

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  status: SubscriptionStatusSchema,
  id: z.string(),
  teamId: z.string(),
  customerId: z.string(),
  planId: z.string(),
  variantId: z.string(),
  nextPaymentDate: z.coerce.date().nullable(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

/////////////////////////////////////////
// SCORE SCHEMA
/////////////////////////////////////////

export const ScoreSchema = z.object({
  Status: ScoreStatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  score: z.number().int(),
  Token: z.number().int(),
  createdAt: z.coerce.date(),
})

export type Score = z.infer<typeof ScoreSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  type: TaskTypeSchema,
  status: TaskStatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

export type Task = z.infer<typeof TaskSchema>
