SELECT 
cli.id as "userId",
sub.id as "suscriptionId",
contr.id as "contractId",
contr.note as "note",
contr.finished as "finished",
contr."createdAt"as "createdAt",
contr."finishedAt" as "finishedAt",
pl."detailName" as "planName",
pl.id as "planId",
act.id as "activityId",
act."detailName" as "activityName",
pl."detailPrice" as "planPrice",
act."detailPrice" as "activityPrice"
FROM public.contract as contr
INNER JOIN  public.client as cli on contr."clientId" = cli.id 
INNER JOIN  public.suscription as sub on sub.id = contr."suscriptionId"
LEFT JOIN  public.activity as act on act."suscriptionId" = sub.id 
LEFT JOIN  public.plan as pl on pl."suscriptionId" = sub.id