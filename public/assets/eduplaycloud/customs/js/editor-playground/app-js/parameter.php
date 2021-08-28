<?php
$Mustache = require('mustache');
$fs = require('fs');
$path = require('path');
$math = require('mathjs');
$faker = require('../../vendor/faker/faker.min');
function convertToStatic_E($parsedExerciseSet) {
$ExerciseSetStaticJson = array();
$parsedExerciseSet->forEach(function ($parsedQuestion) {
$parsedQuestion = convertToStatic_Q($parsedQuestion);
array_push($ExerciseSetStaticJson, $parsedQuestion);
}
);
$console->log('Finished converting to Static ExerciseSet');
return $ExerciseSetStaticJson;
}
function convertToStatic_Q($parsedQuestion) {
$qParam = null;
if ($parsedQuestion::Parameters != null) {
$qParam = evaluateParameters($parsedQuestion);
$parsedQuestion = substituteEvaluatedParameters($parsedQuestion, $qParam);
}return $parsedQuestion;
}
function evaluateParameters($parsedQuestion) {
global $faker;
global $path;
global $math;$parsedParam = null;
$parsedParam = $parsedQuestion::Parameters;
try {
$qParam = array();
$parsedParam->forEach(function ($_p) use (&$qParam, &$faker, &$path, &$math) {
switch ($_p->value->type){case "random.number":
$from = Number($_p->value->from);
$to = Number($_p->value->to);
$numberType = $_p->value->numberType;
switch ($numberType){case "Int":
$qParam[$_p->parameter] = floor(rand() * $to) + $from;
break;
case "Dec":
$qParam[$_p->parameter] = floatval(rand())->toFixed(3) * $to + $from;
break;
}break;
case "random.string":
$stringType = $_p->value->stringType;
switch ($stringType){case "name":
$qParam[$_p->parameter] = $faker->name->findName();
break;
case "city":
$qParam[$_p->parameter] = $faker->address->city();
break;
default:
$qParam[$_p->parameter] = "";

}break;
case "random.fromlist":
$mArray = $_p->value->list;
$index = floor(rand() * count($mArray));
$qParam[$_p->parameter] = $mArray[$index];
break;
case "file":
$filename = $_p->value->filename + '.csv';
$userID = '123Omar';
$excerciseSetID = '1';
$questionID = '2232';
$uid = $userID + '-' + $excerciseSetID + '-' + $questionID;
$filename = $uid + '-' + $filename;
$filename = '../../../data/' + $userID + '/' + $filename;
$filename = $path->resolve($__dirname, $filename);
$lines = explode("\n", ());
$randomline = $lines[floor(rand() * count($lines))];
$fieldsNames = explode(",", $lines[0]);
$fields = explode(",", $randomline);
$obj = array();
for ($i = 0;
$i < count($fields);$i++) {$paramName = $_p->parameter + "_" + $fieldsNames[$i];
$qParam[trim($paramName)] = trim($fields[$i]);
}break;
case "joinstring":
$stringlist = $_p->value->list;
$qParam[$_p->parameter] = join('', $stringlist);
break;
case "math":
$mathExpression = $_p->value->mathExpression;
$qParam[$_p->parameter] = $math->eval($mathExpression, $qParam)->toFixed(3);
break;
default:
$qParam[$_p->parameter] = "...error...";

}}
);
} catch (Exception $err) {
$console->log('error in evaluation of paramaters: ' + $err, 'error');
}
return $qParam;
}


function substituteEvaluatedParameters($parsedQuestion, $qParam) {
unset($parsedQuestion::Parameters);
$res = Mustache::render(json_encode($parsedQuestion), $qParam);
if ($res) {
$parsedQuestion = json_decode($res);
} else {$console->log("error in template engine", 'error');
}return $parsedQuestion;
}
$module->exports = $convertToStatic_E;

