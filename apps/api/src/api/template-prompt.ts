export const getTemplatePromptTask = () => `1. 回答合并在一个SQL里。
1. 设定A的值为张旭。
1. 每行计算出佣金比例，佣金比例的公式是 sale_rate 大于 standard_rate 时，佣金比例为 sale_rate - standard_rate，如果小于的话，则佣金比例为 0；
2. 每行计算出佣金金额，规则是佣金比例乘以 gross_profit 表的 amount。
4. 计算出 commission_amount, 公式是按 sale_name 进行分组，计算出佣金金额的总和，四舍五入小数点后两位，然后取 sale_name 为A的佣金金额。
4. 以上步骤得到 B 表，第一列为 sale_name，第二列为 commission_amount，sale_name为A仅显示一行。
5. 命名为 out_day_30_amount，公式是 aging 表里 invoice_type 为销售出库单，sale_name 为A的记录的 day_30_amount 的总和。
6. 命名为 out_day_60_amount，公式是 aging 表里 invoice_type 为销售出库单，sale_name 为A的记录的 day_60_amount 的总和。
7. 命名为 out_day_90_amount，公式是 aging 表里 invoice_type 为销售出库单，sale_name 为A的记录的 day_90_amount 的总和。
8. 命名为 out_day_120_amount，公式是 aging 表里 invoice_type 为销售出库单，sale_name 为A的记录的 day_120_amount 的总和。
9. 命名为 out_more_than_120_amount，公式是 aging 表里 invoice_type 为销售出库单，sale_name 为A的记录的 day_more_than_120_amount 的总和。
10. 命名为 bill_day_30_amount，公式是 aging 表里 invoice_type 为销售发票，sale_name 为A的记录的 day_30_amount 的总和。
11. 命名为 bill_day_60_amount，公式是 aging 表里 invoice_type 为销售发票，sale_name 为A的记录的 day_60_amount 的总和。
12. 命名为 bill_day_90_amount，公式是 aging 表里 invoice_type 为销售发票，sale_name 为A的记录的 day_90_amount 的总和。
13. 命名为 bill_day_120_amount，公式是 aging 表里 invoice_type 为销售发票，sale_name 为A的记录的 day_120_amount 的总和。
14. 命名为 bill_more_than_120_amount，公式是 aging 表里 invoice_type 为销售发票，sale_name 为A的记录的 day_more_than_120_amount 的总和。
15. 以上步骤得到 C 表，sale_name为A仅显示一行。
15. 计算出 pre_sale_amount，公式是 aging 表里 invoice_type 为收款单(预收)，sale_name 为A的记录的 billing_amount 的总和。
15. 以上步骤得到 D 表，sale_name为A仅显示一行。

15. 计算出 out_total_amount，公式是C表的 out_day_30_amount * 30/365*0.05 + out_day_60_amount * 60/365*0.05 + out_day_90_amount * 90/365*0.05 + out_day_120_amount * 120/365*0.05 + out_more_than_120_amount * 150/365*0.05，然后四舍五入保留小数点后两位。
16. 计算出 bill_total_amount，公式是C表的 bill_day_30_amount * 30/365*0.05 + bill_day_60_amount * 60/365*0.05 + bill_day_90_amount * 90/365*0.05 + bill_day_120_amount * 120/365*0.05 + bill_more_than_120_amount * 150/365*0.05，然后四舍五入保留小数点后两位。
16. 计算出 pre_sale_total_amount，公式是D表pre_sale_amount*30/365*0.05，然后四舍五入保留小数点后两位。
18. 计算出 interest_amount，公式是 out_total_amount 加 bill_total_amount 加 pre_sale_total_amount，然后四舍五入保留小数点后两位。
18. 以上步骤得到 E 表，第一列为 sale_name，第二列为out_total_amount，第三列为bill_total_amount，第四列为E表的pre_sale_total_amount，第五列为 interest_amount，sale_name为A仅显示一行。

19. 把 B 表和 E 表按 sale_name 进行 join，第一列为E表sale_name，第二列为B表commission_amount，第三列为E表interest_amount，第四列为paid_amount（公式是 commission_amount 减 interest_amount），第五列为E表out_total_amount，第六列为E表bill_total_amount，第七列为E表的pre_sale_total_amount，命名为 F 表，sale_name为A仅显示一行。
21. 仅显示F表。
`;
