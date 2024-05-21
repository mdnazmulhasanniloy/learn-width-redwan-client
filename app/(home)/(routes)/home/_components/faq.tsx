"use client";

import React from "react";
import { motion } from "framer-motion";
import Title from "@/components/ui/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const variants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="my-20 w-11/12 mx-auto ">
      {/* <LoadingCard variants={variants} /> */}

      <div className="flex flex-col justify-center items-center mb-20">
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className=""
        >
          <Title className="text-xl md:text-5xl font-semibold text-center">
            Frequently Asked Questions
          </Title>
        </motion.div>

        <motion.p
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="text-md text-center mt-4"
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </motion.p>

        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="my-20 w-11/12 md:w-3/5 mx-auto bg-white shadow-md border border-gray-200 p-3 rounded-md"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>For Whom Is This COurse?</AccordionTrigger>
              <AccordionContent>
                This Course Is Created For Those Who Want To Learn Web
                Development From Scratch And Build A Career As A Web Developer
                In Software Companies. Even Those Who Studied CSE For Four Years
                But Didn&rsquo;t Learn Much And Couldn&rsquo;t Decide What To
                Do, Can Complete Web Development From This Course And Apply For
                Jobs. 😀
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What Prior Experience Is Needed For This COurse?
              </AccordionTrigger>
              <AccordionContent>
                Since We&rsquo;ll Be Teaching From Scratch, You Don&rsquo;t Need
                To Know Anything Beforehand. But If You Have Free Time, You Can
                Do These Things: Be Comfortable With A Computer, Internet So
                That You Can Search Anything Online You Should Have Basic
                English Literacy Typing Speed 15-30 Wpm Will Be Excellent.
                Familiarity With HTML, CSS Would Be Fantastic..
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What Education Background Is Required?
              </AccordionTrigger>
              <AccordionContent>
                We Have Designed The Course In Such A Way That Your Educational
                Background Doesn&rsquo;t Matter Here. You Can Do This Course
                From Any Educational Background. Anyone, Such As A University
                Student, College Student, Jobber, Unemployed, Lover, Runaway
                Lover, Even The Girlfriend Who Doesn&rsquo;t Pick Up The Phone
                Can Do This Course. However, You Have To Commit 6-8 Hours
                Everyday.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How Will I Get A Job After Completing The Course?
              </AccordionTrigger>
              <AccordionContent>
                Take Note Of One Thing Clearly: We Cannot Guarantee You A Job.
                However, You&rsquo;ll Go To SCIC If You Finish The Main Course
                On Time. There You Will Get Job-Related And Interview-Related
                Specific Training. Work Hard There And One Of Our Job Placement
                Team Members Will Send Your CV/Resume To Several Companies.
                Interestingly, Many Of Our Students Get Jobs As They Apply By
                Themselves. Finally, If You Keep Working Hard, One Of Our Job
                Placement Managers Will Keep Guiding You Until You Get A Job.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
