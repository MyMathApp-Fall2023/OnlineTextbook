

export default interface TransactionRecord {
	readonly id: number;
	readonly item_id: number;
	readonly code_id: number;
	readonly user_id: number;
	createdAt: Date;
	price: number;
}
