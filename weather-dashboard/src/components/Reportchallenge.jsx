import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function Reportchallenge() {
    const [submitted, setSubmitted] = useState(false);

    // Initial values - only essential fields
    const initialValues = {
        name: "",
        email: "",
        title: "",
        description: "",
        severity: "medium"
    };

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().optional(),
        email: Yup.string().email('Invalid email').optional(),
        title: Yup.string()
            .min(3, 'Title too short')
            .max(100, 'Title too long')
            .required('Title is required'),
        description: Yup.string()
            .min(10, 'Description too short')
            .max(500, 'Description too long')
            .required('Description is required'),
        severity: Yup.string()
            .oneOf(['low', 'medium', 'high'])
            .required('Severity is required')
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log('Bug report:', values);
        setSubmitted(true);
        
        setTimeout(() => {
            setSubmitted(false);
            resetForm();
        }, 3000);
    };

    const severityOptions = [
        { value: "low", label: "Low", color: "from-green-100 to-emerald-100 text-emerald-800 border-emerald-200" },
        { value: "medium", label: "Medium", color: "from-yellow-100 to-amber-100 text-amber-800 border-amber-200" },
        { value: "high", label: "High", color: "from-red-100 to-rose-100 text-rose-800 border-rose-200" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 py-12 px-4">
            {/* Green decorative elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
            
            <div className="relative max-w-xl mx-auto">
                {/* Header with green theme */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 shadow-lg">
                        <span className="text-3xl text-white">🐛</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Report an Issue
                    </h1>
                    <p className="text-gray-600">
                        Help us improve by reporting any problems you've found
                    </p>
                </div>

                {/* Form Card with green accents */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-green-100">
                    {submitted ? (
                        <div className="text-center py-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full mb-6 shadow-sm">
                                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Thank You! 🌿
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Your report has been submitted successfully.
                            </p>
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full border border-green-200">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-emerald-700 font-medium">
                                    Report submitted successfully
                                </span>
                            </div>
                        </div>
                    ) : (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values }) => (
                                <Form className="space-y-6">
                                    {/* Name and Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Name (optional)
                                            </label>
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-rose-500 text-sm mt-1" />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email (optional)
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-rose-500 text-sm mt-1" />
                                        </div>
                                    </div>

                                    {/* Title with green focus */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Issue Title *
                                        </label>
                                        <Field
                                            type="text"
                                            name="title"
                                            placeholder="Brief description of the issue"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-rose-500 text-sm mt-1" />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description *
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            placeholder="Describe the issue, steps to reproduce, expected vs actual behavior..."
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                                        />
                                        <div className="flex justify-between mt-1">
                                            <ErrorMessage name="description" component="span" className="text-rose-500 text-sm" />
                                            <span className={`text-sm ${
                                                values.description.length > 500 ? 'text-rose-500' : 'text-emerald-600'
                                            }`}>
                                                {values.description.length}/500
                                            </span>
                                        </div>
                                    </div>

                                    {/* Severity with green theme */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            How severe is this issue? *
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {severityOptions.map((option) => (
                                                <label 
                                                    key={option.value}
                                                    className={`cursor-pointer p-3 rounded-lg border text-center transition-all ${
                                                        values.severity === option.value 
                                                            ? `bg-gradient-to-br ${option.color} shadow-sm scale-105` 
                                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <Field
                                                        type="radio"
                                                        name="severity"
                                                        value={option.value}
                                                        className="hidden"
                                                    />
                                                    <span className="font-medium">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <ErrorMessage name="severity" component="div" className="text-rose-500 text-sm mt-1" />
                                    </div>

                                    {/* Submit Button with green gradient */}
                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                    </svg>
                                                    Submitting...
                                                </span>
                                            ) : 'Submit Report'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {/* Green Privacy Note */}
                    <div className="mt-8 pt-6 border-t border-emerald-100">
                        <div className="flex items-center gap-3">
                            <div className="text-emerald-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-emerald-800 font-medium">Your information is secure</p>
                                <p className="text-emerald-700 text-sm">
                                    We respect your privacy and keep all reports confidential
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer with leaf emoji */}
                <div className="mt-8 text-center">
                    <p className="text-emerald-700 text-sm">
                        Thank you for helping us grow! 🍃
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Reportchallenge;