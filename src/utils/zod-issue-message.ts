import _ from 'lodash';
import {ZodIssue} from "zod";

export const getZodIssueMessage = (errors: ZodIssue[]) => {
    return _.map(_.groupBy(errors, 'message'), (group, message) => ({
        paths: group.map(error => error.path.join('.')),
        message
    }));
}