"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRatingText = exports.HealthRating = exports.HealthCheckRating = exports.EntryType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
var EntryType;
(function (EntryType) {
    EntryType[EntryType["HealthCheck"] = 0] = "HealthCheck";
    EntryType[EntryType["Hospital"] = 1] = "Hospital";
    EntryType[EntryType["OccupationalHealthcare"] = 2] = "OccupationalHealthcare";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var HealthRating;
(function (HealthRating) {
    HealthRating[HealthRating["CriticalRisk"] = 1] = "CriticalRisk";
    HealthRating[HealthRating["HighRisk"] = 2] = "HighRisk";
    HealthRating[HealthRating["LowRisk"] = 3] = "LowRisk";
    HealthRating[HealthRating["Healthy"] = 4] = "Healthy";
})(HealthRating = exports.HealthRating || (exports.HealthRating = {}));
var HealthCheckRatingText;
(function (HealthCheckRatingText) {
    HealthCheckRatingText[HealthCheckRatingText["Healthy"] = 0] = "Healthy";
    HealthCheckRatingText[HealthCheckRatingText["LowRisk"] = 1] = "LowRisk";
    HealthCheckRatingText[HealthCheckRatingText["HighRisk"] = 2] = "HighRisk";
    HealthCheckRatingText[HealthCheckRatingText["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRatingText = exports.HealthCheckRatingText || (exports.HealthCheckRatingText = {}));
