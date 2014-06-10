/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2014年 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "BeK0sukeTibubbleView.h"

@implementation BeK0sukeTibubbleView

-(id)init
{
    self = [super init];
    
    bubbleRadius = 20.0f;
    bubbleBeak = 0;
    
    return self;
}

-(void)dealloc
{
    [super dealloc];
}

-(void)frameSizeChanged:(CGRect)frame bounds:(CGRect)bounds
{
    [self setNeedsDisplay];
}

-(void)drawRect:(CGRect)rect
{
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSaveGState(context);
    
    if (bubbleBeak == 1)
    {
        CGContextTranslateCTM(context, [self bounds].size.width, 0);
        CGContextScaleCTM(context, -1.0, 1.0);
    }
    
    CGContextBubblePath(context, [self bounds], bubbleRadius);
    
    CGPathRef bubblePath = CGContextCopyPath(context);
    
    if (bubbleColor == nil)
    {
        CGContextSetRGBFillColor(context, 1.0, 1.0, 1.0, 1.0);
    }
    else
    {
        CGContextSetFillColorWithColor(context, bubbleColor);
    }
    CGContextFillPath(context);
    
    CGPathRelease(bubblePath);
    
    CGContextRestoreGState(context);
}

-(void)setBubbleColor_:(id)args
{
    bubbleColor = [[TiUtils colorValue:args] _color].CGColor;
}

-(void)setBubbleRadius_:(id)args
{
    bubbleRadius = [TiUtils floatValue:args def:20.0f];
}

-(void)setBubbleBeak_:(id)args
{
    bubbleBeak = [TiUtils intValue:args def:0];
}

/*
 CGContextBubblePath by
 https://github.com/miyakeryo/objc-ryo/tree/master/BubbleDraw/BubbleDraw
 */

#if !defined(RADIANS)
#define RADIANS(D) (D * M_PI / 180)
#endif

void CGContextBubblePath(CGContextRef context, CGRect rect, CGFloat radius)
{
    CGFloat qx = 4;
    CGFloat qy = 10;
    CGFloat cqy = 4;
    CGFloat lx = CGRectGetMinX(rect)+qx;
    CGFloat rx = CGRectGetMaxX(rect);
    CGFloat ty = CGRectGetMinY(rect);
    CGFloat by = CGRectGetMaxY(rect);
    
    CGContextBeginPath(context);
    
    CGContextMoveToPoint(context, lx, ty+radius);
    CGContextAddArc(context, lx+radius, ty+radius, radius, RADIANS(180), RADIANS(270), 0);
    CGContextAddArc(context, rx-radius, ty+radius, radius, RADIANS(270), RADIANS(360), 0);
    CGContextAddArc(context, rx-radius, by-radius, radius, RADIANS(0), RADIANS(90), 0);
    CGContextAddArc(context, lx+radius, by-radius, radius, RADIANS(90), RADIANS(125), 0);
    CGContextAddQuadCurveToPoint(context, lx, by, lx-qx, by);
    CGContextAddQuadCurveToPoint(context, lx, by-cqy, lx, by-qy);
    
    CGContextClosePath(context);
}

@end
