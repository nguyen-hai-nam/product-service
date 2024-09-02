export class ResponseMessageEntity {

    private readonly singular: string;
    private readonly plural: string;

    constructor(singular: string, plural: string) {
        this.singular = singular.toLowerCase();
        this.plural = plural.toLowerCase();
    }

    findManyMessage(success: boolean = true) {
        return success
            ? `${this.toCapitalCase(this.plural)} retrieved successfully.`
            : `Fail to retrieve ${this.plural}.`
    }

    findOneMessage(success: boolean = true) {
        return success
            ? `Retrieve ${this.singular} successfully.`
            : `Fail to retrieve ${this.singular}.`
    }

    createMessage(success: boolean = true) {
        return success
            ? `${this.toCapitalCase(this.singular)} created successfully.`
            : `Fail to create ${this.singular}.`
    }

    updateMessage(success: boolean = true) {
        return success
            ? `${this.toCapitalCase(this.singular)} updated successfully.`
            : `Fail to update ${this.singular}.`
    }

    deleteMessage(success: boolean = true) {
        return success
            ? `${this.toCapitalCase(this.singular)} deleted successfully.`
            : `Fail to delete ${this.singular}.`
    }

    notFoundMessage() {
        return `${this.toCapitalCase(this.singular)} not found.`
    }

    internalErrorMessage() {
        return `Internal server error.`
    }

    private toCapitalCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}